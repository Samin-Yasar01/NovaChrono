'use client';

import { useState, useEffect } from 'react';
import { X, Plus, Image as ImageIcon } from 'lucide-react';

interface ImageUploadItem {
  id: string;
  name: string;
  url: string;
  preview?: string;
  order: number;
}

interface ImageUploadProps {
  productId?: string;
  onImagesChange: (images: ImageUploadItem[]) => void;
  onRemoveExistingImages?: (imageIds: string[]) => void;
  existingImages?: ImageUploadItem[];
}

const compressImage = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Resize if image is too large
        const maxWidth = 1200;
        const maxHeight = 1200;

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);

        // Compress to JPEG with quality
        const compressed = canvas.toDataURL('image/jpeg', 0.8);
        resolve(compressed);
      };

      img.src = event.target?.result as string;
    };

    reader.readAsDataURL(file);
  });
};

export default function ImageUpload({
  productId,
  onImagesChange,
  onRemoveExistingImages,
  existingImages = [],
}: ImageUploadProps) {
  const [newImages, setNewImages] = useState<ImageUploadItem[]>([]);
  const [currentExistingImages, setCurrentExistingImages] = useState<ImageUploadItem[]>(existingImages);
  const [removedImageIds, setRemovedImageIds] = useState<string[]>([]);
  const [allImages, setAllImages] = useState<ImageUploadItem[]>(existingImages);
  const [dragActive, setDragActive] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);

  // Sync existing images when prop changes
  useEffect(() => {
    setCurrentExistingImages(existingImages);
    setAllImages([...existingImages, ...newImages]);
  }, [existingImages, newImages]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files) {
      handleFiles(files);
    }
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFiles = async (files: FileList) => {
    setIsCompressing(true);
    const imageFiles = Array.from(files).filter((f) => f.type.startsWith('image/'));
    const newImageItems: ImageUploadItem[] = [];

    for (let i = 0; i < imageFiles.length; i++) {
      const file = imageFiles[i];
      try {
        const compressed = await compressImage(file);

        const newImage: ImageUploadItem = {
          id: `${Date.now()}-${i}`,
          name: file.name,
          url: compressed,
          preview: compressed,
          order: newImages.length + newImageItems.length,
        };

        newImageItems.push(newImage);
      } catch (error) {
        console.error(`Failed to compress image: ${file.name}`, error);
      }
    }

    const updatedNewImages = [...newImages, ...newImageItems];
    setNewImages(updatedNewImages);
    onImagesChange([...existingImages, ...updatedNewImages]);
    setIsCompressing(false);
  };

  const removeImage = (id: string) => {
    const updatedNewImages = newImages
      .filter((img) => img.id !== id)
      .map((img, idx) => ({ ...img, order: currentExistingImages.length + idx }));
    setNewImages(updatedNewImages);
    onImagesChange([...currentExistingImages, ...updatedNewImages]);
  };

  const removeExistingImage = (id: string) => {
    const updatedExistingImages = currentExistingImages.filter((img) => img.id !== id);
    setCurrentExistingImages(updatedExistingImages);
    setAllImages([...updatedExistingImages, ...newImages]);
    
    const newRemovedIds = [...removedImageIds, id];
    setRemovedImageIds(newRemovedIds);
    
    if (onRemoveExistingImages) {
      onRemoveExistingImages(newRemovedIds);
    }
  };

  const moveImage = (id: string, direction: 'up' | 'down') => {
    const index = newImages.findIndex((img) => img.id === id);
    if (
      (direction === 'up' && index > 0) ||
      (direction === 'down' && index < newImages.length - 1)
    ) {
      const newIndex = direction === 'up' ? index - 1 : index + 1;
      const updatedNewImages = [...newImages];
      [updatedNewImages[index], updatedNewImages[newIndex]] = [
        updatedNewImages[newIndex],
        updatedNewImages[index],
      ];
      updatedNewImages.forEach((img, idx) => {
        img.order = existingImages.length + idx;
      });
      setNewImages(updatedNewImages);
      onImagesChange([...existingImages, ...updatedNewImages]);
    }
  };

  return (
    <div className="space-y-4">
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`relative rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
          dragActive
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
            : 'border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-900/50'
        }`}
      >
        <input
          type="file"
          id="image-input"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          disabled={isCompressing}
          className="hidden"
        />
        <label
          htmlFor="image-input"
          className={`cursor-pointer space-y-2 ${isCompressing ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <div className="flex justify-center">
            <ImageIcon className="h-12 w-12 text-gray-400" />
          </div>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {isCompressing ? 'Compressing images...' : 'Drag and drop images here or click to select'}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Supported formats: PNG, JPG, GIF, WebP (will be compressed automatically)
          </p>
        </label>
      </div>

      {allImages.length > 0 && (
        <div className="space-y-4">
          {/* Existing Images Section */}
          {currentExistingImages.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                Existing Images ({currentExistingImages.length})
              </h3>
              <div className="space-y-2">
                {currentExistingImages.map((image) => (
                  <div
                    key={image.id}
                    className="flex items-center gap-3 rounded-lg border border-green-200 dark:border-green-900/30 p-3 bg-green-50 dark:bg-green-900/10"
                  >
                    {image.preview && (
                      <img
                        src={image.preview}
                        alt={image.name}
                        className="h-12 w-12 rounded object-cover"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {image.name}
                      </p>
                      <p className="text-xs text-green-600 dark:text-green-400">
                        Already saved
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeExistingImage(image.id)}
                      className="inline-flex items-center justify-center h-8 w-8 rounded text-red-500 hover:text-red-700 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      title="Remove image"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* New Images Section */}
          {newImages.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
                New Images to Add ({newImages.length})
              </h3>
              <div className="space-y-2">
                {newImages.map((image, idx) => (
                  <div
                    key={image.id}
                    className="flex items-center gap-3 rounded-lg border border-blue-200 dark:border-blue-900/30 p-3 bg-blue-50 dark:bg-blue-900/10"
                  >
                    {image.preview && (
                      <img
                        src={image.preview}
                        alt={image.name}
                        className="h-12 w-12 rounded object-cover"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {image.name}
                      </p>
                      <p className="text-xs text-blue-600 dark:text-blue-400">
                        Will be added on save
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => moveImage(image.id, 'up')}
                        disabled={idx === 0}
                        className="inline-flex items-center justify-center h-8 w-8 rounded text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        title="Move up"
                      >
                        ↑
                      </button>
                      <button
                        type="button"
                        onClick={() => moveImage(image.id, 'down')}
                        disabled={idx === newImages.length - 1}
                        className="inline-flex items-center justify-center h-8 w-8 rounded text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        title="Move down"
                      >
                        ↓
                      </button>
                      <button
                        type="button"
                        onClick={() => removeImage(image.id)}
                        className="inline-flex items-center justify-center h-8 w-8 rounded text-red-500 hover:text-red-700 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        title="Remove image"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
