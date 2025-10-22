# Discovery Form - Intelligent Multi-Step Form Implementation

## Overview

The Discovery Form is a comprehensive 4-step wizard that collects client requirements for website development. It features intelligent conditional logic, auto-save functionality, and dynamic validation based on user selections.

---

## Architecture

### Core Components

1. **Main Container**: `/src/app/discovery-form/page.tsx`
   - Manages form state across all sections
   - Handles navigation between steps
   - Implements auto-save and data persistence
   - Manages scroll behavior and step transitions

2. **Section Components**:
   - **Section 1**: `/src/components/discovery/Section1BrandIdentity.tsx` - Brand information
   - **Section 2**: `/src/components/discovery/Section2Domain.tsx` - Domain selection
   - **Section 3**: `/src/components/discovery/Section3Content.tsx` - Website content (intelligent)
   - **Section 4**: `/src/components/discovery/Section4Confirmation.tsx` - Review & submit

3. **Shared Components**:
   - **RepeaterField**: `/src/components/forms/RepeaterField.tsx` - Dynamic add/remove field groups
   - **ProgressIndicator**: `/src/components/discovery/ProgressIndicator.tsx` - Step progress display
   - **FolderGuide**: `/src/components/discovery/FolderGuide.tsx` - File organization guide

4. **API Endpoints**:
   - `/api/discovery/save` - Auto-save form progress
   - `/api/discovery/load` - Load saved form data
   - `/api/migrate` - Run database migrations

---

## Section 1: Brand Identity

### Purpose
Collects business branding information and main website goal.

### Fields
- **Email** (required) - For saving progress and communication
- **Business Name** (required)
- **Business Tagline** (optional)
- **Social Media Links** (optional, repeater)
  - Platform dropdown
  - Handle/username input (auto-generates full URLs)
- **Brand Style Description** (required, 10-200 chars)
- **Inspiration Websites** (required, 2 sites)
  - Accepts flexible URL formats (example.com, www.example.com, https://example.com)
  - Auto-normalizes to https://
- **Main Website Goal** (required) - **CRITICAL FOR SECTION 3 INTELLIGENCE**

### Main Goal Options
```typescript
const websiteGoals = [
  { label: 'Get phone calls from customers', value: 'call' },
  { label: 'Receive contact form submissions', value: 'contact_form' },
  { label: 'Showcase portfolio/work', value: 'portfolio' },
  { label: 'Provide information about services', value: 'information' },
  { label: 'Sell products online', value: 'sell_products' },
];
```

### Key Features
- **Social URL Auto-generation**: User enters "@username", system builds "https://instagram.com/username"
- **Flexible URL Validation**: Accepts and normalizes various URL formats
- **Auto-save**: All fields save on blur/change

### Critical Fix Applied
**Problem**: Dropdown onChange was overriding React Hook Form's onChange, preventing form state updates.
**Solution**: Wrapped onChange to call both register's onChange AND handleAutoSave:
```typescript
onChange={(e) => {
  register('main_goal').onChange(e);
  handleAutoSave();
}}
```

---

## Section 2: Domain Name

### Purpose
Collects desired domain names with TLD selection.

### Fields
- **Desired Domain** (required)
  - Domain name input + TLD dropdown
  - Stores complete domain (e.g., "mycompany.com")
- **Alternative Domain 1** (required) - Backup option
- **Alternative Domain 2** (required) - Second backup

### TLD Options
`.com`, `.net`, `.org`, `.co`, `.io`, `.africa`, `.gh`, `.ng`

### Implementation Details
```typescript
// Stored as complete domain
desired_domain: "mycompany.com"

// UI separates for better UX
<Input value={domainName1} /> // "mycompany"
<select value={tld1}>         // ".com"
```

### Key Features
- **Smart Domain Extraction**: Splits saved domains into name + TLD for editing
- **Validation**: Regex validates complete domain with extension
- **Auto-save**: Triggers on both name change and TLD selection

---

## Section 3: Website Content (INTELLIGENT SECTION)

### Purpose
Collects content for all website pages with intelligent adaptation based on `main_goal` from Section 1.

### Tabs
1. **Homepage** - Headline & intro
2. **About** - Headline & description
3. **Offerings** - Services/Products/Portfolio (INTELLIGENT)
4. **Gallery** - Headline (images via shared folder)
5. **Files & Assets** - Shared folder link
6. **Contact** - Phone, email, address, form recipient

---

### CRITICAL: Intelligent Offerings Section

The offerings section **dynamically adapts** based on the user's `main_goal` selection from Section 1.

#### Dynamic Schema (useMemo)

```typescript
const section3Schema = useMemo(() => {
  const requireOfferings = mainGoal && mainGoal !== 'portfolio';

  return z.object({
    offerings_headline: requireOfferings
      ? z.string().min(5, 'Headline required')
      : z.string().optional(),

    offerings_list: requireOfferings
      ? z.array(...).min(1, 'Add at least one item')
      : z.array(...).optional(),
  });
}, [mainGoal]);
```

#### Validation Rules by Goal

| main_goal | offerings_headline | offerings_list | Reasoning |
|-----------|-------------------|----------------|-----------|
| `sell_products` | **REQUIRED** | **REQUIRED (min 1)** | Must list products to sell |
| `call` | **REQUIRED** | **REQUIRED (min 1)** | Must list services offered |
| `contact_form` | **REQUIRED** | **REQUIRED (min 1)** | Must list services offered |
| `information` | **REQUIRED** | **REQUIRED (min 1)** | Must list services described |
| `portfolio` | **OPTIONAL** | **OPTIONAL** | Portfolio sites may not have services/products |

#### Offering Types

The system supports **three types** of offerings:

1. **Service** - Services offered (pricing optional)
2. **Product** - Products for sale (pricing required)
3. **Portfolio** - Work samples/case studies (no pricing)

#### Type Structure

```typescript
type OfferingItem = {
  type: 'service' | 'product' | 'portfolio';
  name: string;              // Service name / Product name / Project title
  description: string;       // Detailed description
  category?: string;         // Optional categorization
  price?: string;            // Required for products, optional for services, hidden for portfolio
};
```

#### Price Field Intelligence

The price field uses **conditional visibility**:

```typescript
{
  name: 'price',
  type: 'text',
  label: 'Price',
  placeholder: '$99 / GHS 500 / Contact for quote',
  showIf: (item) => item.type !== 'portfolio', // Hide for portfolio
}
```

**Behavior**:
- **Service selected**: Price field shows (optional)
- **Product selected**: Price field shows (required by schema validation)
- **Portfolio selected**: Price field hidden completely

#### Price Validation (superRefine)

```typescript
.superRefine((items, ctx) => {
  items.forEach((item, index) => {
    // Price required ONLY for products
    if (item.type === 'product' && !item.price?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Price is required for products',
        path: [index, 'price'],
      });
    }
  });
})
```

#### Dynamic UI Labels

```typescript
// Tab label
offeringsConfig.label =
  mainGoal === 'sell_products' ? 'Products' :
  mainGoal === 'call/contact_form/information' ? 'Services' :
  mainGoal === 'portfolio' ? 'Portfolio' :
  'Services & Products';

// Help text
{mainGoal === 'sell_products'
  ? 'Add your products with pricing. You can also add services or portfolio items if needed.'
  : mainGoal === 'call/contact_form/information'
  ? 'Add your services (pricing optional). You can also add products or portfolio items if needed.'
  : mainGoal === 'portfolio'
  ? 'Add your portfolio/work samples, products, or services. All optional - add only what you need.'
  : 'Add your services, products, or portfolio items as needed.'}

// Button text
addButtonText={
  mainGoal === 'sell_products' ? 'Add Another Product' :
  mainGoal === 'call/contact_form/information' ? 'Add Another Service' :
  mainGoal === 'portfolio' ? 'Add Another Portfolio Item' :
  'Add Another Item'
}
```

#### Re-validation on Goal Change

```typescript
useEffect(() => {
  trigger(); // Re-validate when mainGoal changes
}, [mainGoal, trigger]);
```

This ensures validation rules update immediately if user goes back to Section 1 and changes their goal.

---

### Real-World Use Cases

#### Use Case 1: E-commerce Store
- **Goal**: `sell_products`
- **Offerings Required**: Yes (min 1 product)
- **User adds**:
  ```typescript
  [
    { type: 'product', name: 'Evening Dress', description: '...', price: '$299' },
    { type: 'product', name: 'Summer Collection', description: '...', price: '$199' }
  ]
  ```
- **Validation**: Price required for all products ✅

#### Use Case 2: Service Business
- **Goal**: `call` or `contact_form`
- **Offerings Required**: Yes (min 1 service)
- **User adds**:
  ```typescript
  [
    { type: 'service', name: 'Web Design', description: '...', price: '$2000' },
    { type: 'service', name: 'SEO Consulting', description: '...', price: '' } // Optional
  ]
  ```
- **Validation**: Price optional for services ✅

#### Use Case 3: Fashion Designer (Hybrid)
- **Goal**: `portfolio`
- **Offerings Optional**: Yes
- **User adds**:
  ```typescript
  [
    { type: 'portfolio', name: 'Spring 2024 Collection', description: '...', category: 'Fashion' },
    { type: 'product', name: 'Black Evening Dress', description: '...', price: '$299' },
    { type: 'service', name: 'Custom Design', description: '...', price: '$150/hr' }
  ]
  ```
- **Validation**:
  - Portfolio items don't need price (field hidden)
  - Products require price
  - Services price optional
  - All offerings optional (can submit with 0 items)

#### Use Case 4: Photographer
- **Goal**: `portfolio`
- **Offerings Optional**: Yes
- **User adds**:
  ```typescript
  [
    { type: 'portfolio', name: 'Wedding Portfolio', description: '...', category: 'Photography' },
    { type: 'service', name: 'Event Photography', description: '...', price: '$500/event' }
  ]
  ```
- **Validation**: Portfolio + services mix works perfectly ✅

---

## RepeaterField Component Enhancement

### Conditional Field Visibility

Added `showIf` support for intelligent field display:

```typescript
interface FieldConfig {
  name: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  options?: { label: string; value: string }[];
  required?: boolean;
  showIf?: (item: Record<string, any>) => boolean; // NEW
}
```

### Implementation

```typescript
const renderField = (field: FieldConfig, index: number, itemValue: any) => {
  // Check conditional visibility
  if (field.showIf && !field.showIf(itemValue)) {
    return null; // Hide field
  }

  // ... render field
};
```

### Usage Example

```typescript
{
  name: 'price',
  type: 'text',
  label: 'Price',
  showIf: (item) => item.type !== 'portfolio', // Hide for portfolio items
}
```

---

## Auto-Save System

### How It Works

1. **Form State**: React Hook Form manages form state
2. **Auto-save Trigger**: OnBlur and onChange events
3. **API Call**: POST to `/api/discovery/save`
4. **Database Update**: Partial update with current section
5. **Submission ID**: Returned and stored in localStorage

### Auto-Save API

**File**: `/src/app/api/discovery/save/route.ts`

```typescript
POST /api/discovery/save
Body: {
  submissionId?: string,
  email: string,
  currentSection: number,
  formData: Partial<FormData>
}

Response: {
  success: true,
  data: {
    submissionId: string,
    resumeToken: string
  }
}
```

### Load API

**File**: `/src/app/api/discovery/load/route.ts`

```typescript
GET /api/discovery/load?email=...&submissionId=...

Response: {
  success: true,
  data: {
    submissionId: string,
    email: string,
    currentSection: number,
    formData: {
      section1: {...},
      section2: {...},
      section3: {...}
    }
  }
}
```

### Persistence Strategy

1. **localStorage**: Stores `submissionId` for page refreshes
2. **URL Parameters**: Supports email, checkoutId, resumeToken, submissionId
3. **Database**: MariaDB with JSON columns for flexible data

---

## Data Flow

```
User fills field → onBlur/onChange
  ↓
handleAutoSave()
  ↓
API: POST /api/discovery/save { submissionId, email, section, formData }
  ↓
Database: UPDATE discovery_submissions SET ... WHERE id = submissionId
  ↓
Response: { submissionId }
  ↓
localStorage.setItem('discoveryFormSubmissionId', submissionId)

--- PAGE REFRESH ---

componentDidMount
  ↓
localStorage.getItem('discoveryFormSubmissionId')
  ↓
API: GET /api/discovery/load?submissionId=...
  ↓
Database: SELECT * FROM discovery_submissions WHERE id = ...
  ↓
Response: { formData, currentSection }
  ↓
Form populates with saved data
  ↓
setCurrentStep(currentSection)
  ↓
window.scrollTo({ top: 0, behavior: 'instant' })
```

---

## Database Schema

### discovery_submissions Table

```sql
CREATE TABLE discovery_submissions (
  id CHAR(36) PRIMARY KEY,           -- UUID
  email VARCHAR(255),
  checkout_id VARCHAR(255),
  resume_token VARCHAR(64),
  completion_status VARCHAR(50),

  -- Section 1: Brand Identity
  business_name VARCHAR(255),
  business_tagline TEXT,
  social_links TEXT,                 -- JSON
  brand_style TEXT,
  inspiration_sites TEXT,            -- JSON
  main_goal VARCHAR(50),

  -- Section 2: Domain
  desired_domain VARCHAR(255),
  alt_domain_1 VARCHAR(255),
  alt_domain_2 VARCHAR(255),

  -- Section 3: Content
  homepage_headline TEXT,
  homepage_intro TEXT,
  about_headline TEXT,
  about_description TEXT,
  offerings_headline TEXT,
  offerings_list TEXT,               -- JSON: [{ type, name, description, category, price }]
  gallery_headline TEXT,
  shared_folder_link TEXT,
  folder_organization_notes TEXT,
  contact_phone VARCHAR(50),
  contact_email VARCHAR(255),
  contact_address TEXT,
  contact_form_recipient VARCHAR(255),

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Offerings List JSON Structure

```json
[
  {
    "type": "service",
    "name": "Web Design",
    "description": "Custom website design and development",
    "category": "Design",
    "price": "$2000"
  },
  {
    "type": "product",
    "name": "E-book: Design Basics",
    "description": "Comprehensive guide to design principles",
    "category": "Education",
    "price": "$29"
  },
  {
    "type": "portfolio",
    "name": "Brand Identity for Coffee Co.",
    "description": "Complete brand overhaul including logo, colors, typography",
    "category": "Branding",
    "price": null
  }
]
```

---

## Critical Implementation Details

### 1. Dynamic Schema Pattern

**Problem**: Static schemas can't adapt to user selections.

**Solution**: Use `useMemo` to create schema based on props/state:

```typescript
const schema = useMemo(() => {
  return z.object({
    field: condition ? z.string().required() : z.string().optional()
  });
}, [condition]);

const { register, ... } = useForm({
  resolver: zodResolver(schema) // Dynamic schema
});
```

### 2. Conditional Validation

**Problem**: Different validation rules for different item types.

**Solution**: Use `.superRefine()` for custom logic:

```typescript
.superRefine((items, ctx) => {
  items.forEach((item, index) => {
    if (item.type === 'product' && !item.price) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Price required for products',
        path: [index, 'price']
      });
    }
  });
})
```

### 3. React Hook Form onChange Override Fix

**Problem**: Adding `onChange={handler}` after `{...register('field')}` breaks form state updates.

**Solution**: Call both register's onChange AND custom handler:

```typescript
<select
  {...register('field')}
  onChange={(e) => {
    register('field').onChange(e);  // Update form state
    customHandler();                 // Custom logic
  }}
>
```

### 4. Conditional Field Rendering

**Problem**: RepeaterField needs to show/hide fields based on other field values.

**Solution**: Add `showIf` function to FieldConfig:

```typescript
{
  name: 'price',
  showIf: (item) => item.type !== 'portfolio'
}

// In renderField:
if (field.showIf && !field.showIf(itemValue)) {
  return null;
}
```

### 5. Re-validation on Dependency Change

**Problem**: Schema changes but form doesn't re-validate.

**Solution**: Add useEffect to trigger validation:

```typescript
useEffect(() => {
  trigger(); // Re-validate all fields
}, [dependency, trigger]);
```

---

## Edge Cases Handled

### 1. User Changes Main Goal After Filling Section 3
- **Scenario**: User selects "Sell products", adds products, then changes to "Portfolio"
- **Handling**:
  - useEffect triggers re-validation
  - Validation rules change immediately
  - Previously required fields become optional
  - No data loss (existing data preserved)

### 2. Portfolio User Adds Products
- **Scenario**: Photographer with portfolio goal adds products (prints for sale)
- **Handling**:
  - All types available in dropdown
  - Products require price (validated)
  - Portfolio items don't need price
  - Mixed types work seamlessly

### 3. Empty Offerings for Portfolio Sites
- **Scenario**: Portfolio-only site with no services/products
- **Handling**:
  - Offerings completely optional
  - Can submit with empty offerings_list
  - Validation passes

### 4. Service Business Without Pricing
- **Scenario**: "Contact for quote" service model
- **Handling**:
  - Service type allows empty price
  - Placeholder suggests "Contact for quote"
  - Validation passes

---

## Testing Checklist

### Auto-Save Testing
- [ ] Fill field → blur → refresh → data persists
- [ ] Change dropdown → data saves immediately
- [ ] Multiple sections → each saves correctly
- [ ] Page refresh → returns to correct section
- [ ] localStorage cleared → loads from URL/email param

### Section 3 Intelligence Testing

**For main_goal = 'sell_products':**
- [ ] Tab shows "Products"
- [ ] offerings_headline required
- [ ] offerings_list required (min 1)
- [ ] Price field shows for all types
- [ ] Price required for product type
- [ ] Validation fails if no products added

**For main_goal = 'call/contact_form/information':**
- [ ] Tab shows "Services"
- [ ] offerings_headline required
- [ ] offerings_list required (min 1)
- [ ] Price field shows but optional for services
- [ ] Price required for product type
- [ ] Validation fails if no services added

**For main_goal = 'portfolio':**
- [ ] Tab shows "Portfolio"
- [ ] offerings_headline optional
- [ ] offerings_list optional
- [ ] Price field hidden for portfolio type
- [ ] Price shows for service/product types
- [ ] Validation passes with 0 items

### Type-Specific Testing
- [ ] Service: Price optional
- [ ] Product: Price required (validation error if empty)
- [ ] Portfolio: Price field completely hidden

### Mixed Type Testing
- [ ] Add service + product → both validate correctly
- [ ] Add portfolio + product → price hidden/shown appropriately
- [ ] Add all 3 types → all validation rules work

---

## Known Limitations

1. **No Multi-Select for Main Goal**: User can only choose one primary goal, but can add multiple offering types manually.

2. **No Data Migration on Goal Change**: If user changes goal, existing offerings aren't automatically converted (by design - preserves user data).

3. **Category Field Not Enforced**: Category is optional text field, not predefined options (flexible by design).

---

## Future Enhancements

1. **Smart Defaults**: Pre-fill offering type based on main_goal when adding new item
2. **Category Suggestions**: Show autocomplete for common categories based on type
3. **Price Templates**: Suggest pricing formats based on industry
4. **Portfolio Gallery Integration**: Link portfolio items to gallery images
5. **Bulk Import**: Allow CSV upload for offerings
6. **Reorder Items**: Drag-and-drop to reorder offerings

---

## Development Guidelines

### When Adding New Conditional Logic

1. **Identify the trigger**: What field/value controls the condition?
2. **Update schema**: Use `useMemo` if validation changes
3. **Add re-validation**: Use `useEffect` with `trigger()`
4. **Update UI labels**: Make labels dynamic based on condition
5. **Test edge cases**: User changes trigger after filling dependent fields

### When Adding New Fields to Offerings

1. **Update schema** in both base and dynamic schema
2. **Add to FieldConfig** in RepeaterField configuration
3. **Update database** schema (add column or extend JSON)
4. **Update save API** to handle new field
5. **Update load API** to return new field
6. **Test auto-save** for new field

---

## Conclusion

The Discovery Form is a sophisticated, intelligent form system that adapts to user needs while maintaining data integrity and providing excellent UX. The key innovation is the **dynamic schema based on main_goal**, which ensures users only see and fill required fields relevant to their specific use case.

The system handles complex scenarios like:
- Fashion designers showcasing work AND selling pieces
- Photographers with portfolio AND services
- E-commerce stores REQUIRING product listings
- Portfolio sites with completely optional offerings

All while maintaining a clean, intuitive interface that doesn't burden users with unnecessary explanations or fields.
