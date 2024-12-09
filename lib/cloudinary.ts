"use client";

import { CldUploadWidget } from "next-cloudinary";

// Configuration simple pour le client
const cloudinaryConfig = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
};

export { CldUploadWidget, cloudinaryConfig }; 