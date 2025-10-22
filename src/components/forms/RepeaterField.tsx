'use client';

/**
 * RepeaterField Component
 * Dynamic add/remove field groups with validation and animations
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

type FieldType = 'text' | 'textarea' | 'select';

interface FieldConfig {
  name: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  options?: { label: string; value: string }[];
  required?: boolean;
  showIf?: (item: Record<string, any>) => boolean;
}

interface RepeaterFieldProps {
  /**
   * Field name for form registration
   */
  name: string;

  /**
   * Field configurations for each item
   */
  fields: FieldConfig[];

  /**
   * Button text for adding new items
   */
  addButtonText?: string;

  /**
   * Minimum number of items
   */
  min?: number;

  /**
   * Maximum number of items
   */
  max?: number;

  /**
   * Current values
   */
  value?: Record<string, any>[];

  /**
   * Change handler
   */
  onChange?: (value: Record<string, any>[]) => void;

  /**
   * Error messages
   */
  errors?: Record<string, string>[];

  /**
   * Additional CSS classes
   */
  className?: string;
}

export default function RepeaterField({
  name,
  fields,
  addButtonText = 'Add Another',
  min = 0,
  max = 10,
  value = [],
  onChange,
  errors = [],
  className,
}: RepeaterFieldProps) {
  const [items, setItems] = useState<Record<string, any>[]>(
    value.length > 0
      ? value
      : min > 0
      ? Array.from({ length: min }, () => ({}))
      : [{}]
  );

  const handleAdd = () => {
    if (items.length < max) {
      const newItems = [...items, {}];
      setItems(newItems);
      onChange?.(newItems);
    }
  };

  const handleRemove = (index: number) => {
    if (items.length > min) {
      const newItems = items.filter((_, i) => i !== index);
      setItems(newItems);
      onChange?.(newItems);
    }
  };

  const handleFieldChange = (index: number, fieldName: string, fieldValue: any) => {
    const newItems = [...items];
    newItems[index] = {
      ...newItems[index],
      [fieldName]: fieldValue,
    };
    setItems(newItems);
    onChange?.(newItems);
  };

  const renderField = (field: FieldConfig, index: number, itemValue: any) => {
    // Check conditional visibility
    if (field.showIf && !field.showIf(itemValue)) {
      return null;
    }

    const fieldId = `${name}.${index}.${field.name}`;
    const currentValue = itemValue[field.name] || '';
    const fieldError = errors[index]?.[field.name];

    switch (field.type) {
      case 'text':
        return (
          <div key={field.name} className="flex-1">
            <Label htmlFor={fieldId}>{field.label}</Label>
            <Input
              id={fieldId}
              value={currentValue}
              onChange={(e) => handleFieldChange(index, field.name, e.target.value)}
              placeholder={field.placeholder}
              className="mt-1.5"
            />
            {fieldError && (
              <p className="text-destructive text-sm mt-1">{fieldError}</p>
            )}
          </div>
        );

      case 'textarea':
        return (
          <div key={field.name} className="flex-1">
            <Label htmlFor={fieldId}>{field.label}</Label>
            <Textarea
              id={fieldId}
              value={currentValue}
              onChange={(e) => handleFieldChange(index, field.name, e.target.value)}
              placeholder={field.placeholder}
              className="mt-1.5"
              rows={3}
            />
            {fieldError && (
              <p className="text-destructive text-sm mt-1">{fieldError}</p>
            )}
          </div>
        );

      case 'select':
        return (
          <div key={field.name} className="flex-1">
            <Label htmlFor={fieldId}>{field.label}</Label>
            <select
              id={fieldId}
              value={currentValue}
              onChange={(e) => handleFieldChange(index, field.name, e.target.value)}
              className="w-full mt-1.5 px-4 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Select {field.label}</option>
              {field.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {fieldError && (
              <p className="text-destructive text-sm mt-1">{fieldError}</p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  const canAdd = items.length < max;
  const canRemove = items.length > min;

  return (
    <div className={cn('space-y-4', className)}>
      <AnimatePresence mode="popLayout">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <div className="bg-card border border-border rounded-lg p-6">
              {/* Drag Handle (visual only) */}
              <div className="flex items-start gap-4">
                <div className="pt-8 text-muted-foreground/30 cursor-move">
                  <GripVertical className="h-5 w-5" />
                </div>

                {/* Field Group */}
                <div className="flex-1 space-y-4">
                  {fields.map((field) => renderField(field, index, item))}
                </div>

                {/* Remove Button */}
                {canRemove && (
                  <button
                    type="button"
                    onClick={() => handleRemove(index)}
                    className="mt-8 p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                    aria-label="Remove item"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Add Button */}
      {canAdd && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Button
            type="button"
            variant="secondary"
            onClick={handleAdd}
            className="w-fit"
          >
            <Plus className="mr-2 h-4 w-4" />
            {addButtonText}
          </Button>
        </motion.div>
      )}

      {/* Item Count */}
      {max > 1 && (
        <p className="text-xs text-muted-foreground">
          {items.length} / {max} item{max > 1 ? 's' : ''}
        </p>
      )}
    </div>
  );
}
