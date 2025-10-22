import {
  generateUploadButton,
  generateUploadDropzone,
  generateReactHelpers,
} from "@uploadthing/react";

import type { OurFileRouter } from "@/app/api/uploadthing/core";

/**
 * Pre-configured Uploadthing components for type-safe file uploads
 */
export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();

/**
 * Helper hooks for custom upload implementations
 */
export const { useUploadThing, uploadFiles } =
  generateReactHelpers<OurFileRouter>();
