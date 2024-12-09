"use client";

import { CldUploadWidget } from "next-cloudinary";
import { ImagePlus, X } from "lucide-react";
import Image from "next/image";
import { Button } from "./button";

interface ImageUploadProps {
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

interface CloudinaryResult {
  info: {
    secure_url: string;
  };
}

// Configuration Cloudinary
const cloudinaryConfig = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'ml_default',
};

export function ImageUpload({ value, onChange, onRemove }: ImageUploadProps) {
  const onUpload = (result: unknown) => {
    const cloudinaryResult = result as CloudinaryResult;
    onChange(cloudinaryResult.info.secure_url);
  };

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div key={url} className="relative w-[200px] h-[200px]">
            <div className="absolute top-2 right-2 z-10">
              <Button
                type="button"
                onClick={() => onRemove(url)}
                variant="destructive"
                size="icon"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <Image
              fill
              className="object-cover"
              alt="Image"
              src={url}
            />
          </div>
        ))}
      </div>
      <CldUploadWidget 
        onUpload={onUpload} 
        uploadPreset={cloudinaryConfig.uploadPreset}
        options={{
          cloudName: cloudinaryConfig.cloudName
        }}
      >
        {({ open }) => (
          <Button
            type="button"
            variant="secondary"
            onClick={() => open()}
          >
            <ImagePlus className="h-4 w-4 mr-2" />
            Ajouter une image
          </Button>
        )}
      </CldUploadWidget>
    </div>
  );
} 