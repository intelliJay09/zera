'use client';

/**
 * Folder Guide Component
 * Provides instructions for organizing and sharing files via cloud storage
 */

import { FolderOpen, CheckCircle2, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FolderGuide() {
  return (
    <div className="space-y-6">
      {/* Overview */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <FolderOpen className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-bold text-foreground mb-2">
              How to Share Your Files
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Upload all your images to a cloud storage folder (Google Drive, Dropbox, etc.)
              and share the link with us. This keeps everything organized in one place.
            </p>
          </div>
        </div>
      </div>

      {/* Expected Folder Structure */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-primary" />
          Recommended Folder Structure
        </h4>

        <div className="bg-muted/50 rounded-lg p-4 font-mono text-sm">
          <div className="space-y-1 text-muted-foreground">
            <div className="font-semibold text-foreground">📁 Your-Business-Name/</div>
            <div className="ml-4">├── 📁 logo/</div>
            <div className="ml-8 text-xs">└── company-logo.png</div>
            <div className="ml-4">├── 📁 homepage-banner/</div>
            <div className="ml-8 text-xs">└── hero-image.jpg</div>
            <div className="ml-4">├── 📁 team-photos/</div>
            <div className="ml-8 text-xs">├── team-member-1.jpg</div>
            <div className="ml-8 text-xs">└── team-member-2.jpg</div>
            <div className="ml-4">├── 📁 service-images/</div>
            <div className="ml-8 text-xs">├── service-1.jpg</div>
            <div className="ml-8 text-xs">└── service-2.jpg</div>
            <div className="ml-4">└── 📁 gallery/</div>
            <div className="ml-8 text-xs">├── project-1.jpg</div>
            <div className="ml-8 text-xs">├── project-2.jpg</div>
            <div className="ml-8 text-xs">└── project-3.jpg</div>
          </div>
        </div>
      </div>

      {/* Instructions by Platform */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Google Drive */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-lg p-5"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="h-8 w-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <span className="text-lg">📂</span>
            </div>
            <h4 className="font-bold text-foreground">Google Drive</h4>
          </div>
          <ol className="space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <span className="font-semibold text-primary">1.</span>
              <span>Go to drive.google.com</span>
            </li>
            <li className="flex gap-2">
              <span className="font-semibold text-primary">2.</span>
              <span>Create a new folder with your business name</span>
            </li>
            <li className="flex gap-2">
              <span className="font-semibold text-primary">3.</span>
              <span>Upload all your images organized in subfolders</span>
            </li>
            <li className="flex gap-2">
              <span className="font-semibold text-primary">4.</span>
              <span>Right-click the main folder → Share</span>
            </li>
            <li className="flex gap-2">
              <span className="font-semibold text-primary">5.</span>
              <span>Change to "Anyone with the link can view"</span>
            </li>
            <li className="flex gap-2">
              <span className="font-semibold text-primary">6.</span>
              <span>Copy the link and paste below</span>
            </li>
          </ol>
          <a
            href="https://drive.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm text-primary hover:underline"
          >
            Open Google Drive <ExternalLink className="h-3 w-3" />
          </a>
        </motion.div>

        {/* Dropbox */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-border rounded-lg p-5"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="h-8 w-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <span className="text-lg">📦</span>
            </div>
            <h4 className="font-bold text-foreground">Dropbox</h4>
          </div>
          <ol className="space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <span className="font-semibold text-primary">1.</span>
              <span>Go to dropbox.com</span>
            </li>
            <li className="flex gap-2">
              <span className="font-semibold text-primary">2.</span>
              <span>Create a new folder with your business name</span>
            </li>
            <li className="flex gap-2">
              <span className="font-semibold text-primary">3.</span>
              <span>Upload all your images organized in subfolders</span>
            </li>
            <li className="flex gap-2">
              <span className="font-semibold text-primary">4.</span>
              <span>Click Share on the main folder</span>
            </li>
            <li className="flex gap-2">
              <span className="font-semibold text-primary">5.</span>
              <span>Create a link with "Anyone with the link can view"</span>
            </li>
            <li className="flex gap-2">
              <span className="font-semibold text-primary">6.</span>
              <span>Copy the link and paste below</span>
            </li>
          </ol>
          <a
            href="https://www.dropbox.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm text-primary hover:underline"
          >
            Open Dropbox <ExternalLink className="h-3 w-3" />
          </a>
        </motion.div>
      </div>

      {/* Important Notes */}
      <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
        <h4 className="font-bold text-foreground mb-2 text-sm">Important:</h4>
        <ul className="space-y-1 text-sm text-muted-foreground">
          <li>• Keep the folder shared until we confirm your website is live (~14 days)</li>
          <li>• Make sure all images are high-resolution (at least 1920px wide for banners)</li>
          <li>• Accepted formats: JPG, PNG, WebP, SVG (for logos)</li>
          <li>• Name files clearly (e.g., "ceo-headshot.jpg" instead of "IMG_1234.jpg")</li>
        </ul>
      </div>

      {/* Alternative Option */}
      <div className="bg-card border border-dashed border-border rounded-lg p-4">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">Don't have cloud storage?</span>
          {' '}You can also use{' '}
          <a
            href="https://wetransfer.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            WeTransfer
          </a>
          {' '}(free, no account needed) or email files directly to{' '}
          <a href="mailto:hello@theastroflow.com" className="text-primary hover:underline">
            hello@theastroflow.com
          </a>
        </p>
      </div>
    </div>
  );
}
