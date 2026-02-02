'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductImageGalleryProps {
    images: any[];
    productName: string;
}

export default function ProductImageGallery({
    images,
    productName,
}: ProductImageGalleryProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    if (!images || images.length === 0) {
        return (
            <div className="bg-gunmetal-800 aspect-square rounded-sm border border-white/5 flex items-center justify-center relative overflow-hidden">
                <div className="text-gunmetal-700 font-bold text-9xl select-none">
                    NC
                </div>
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
            </div>
        );
    }

    const currentImage = images[currentImageIndex];
    const hasMultipleImages = images.length > 1;

    const goToPrevious = () => {
        setCurrentImageIndex((prev) =>
            prev === 0 ? images.length - 1 : prev - 1
        );
    };

    const goToNext = () => {
        setCurrentImageIndex((prev) =>
            prev === images.length - 1 ? 0 : prev + 1
        );
    };

    return (
        <div className="space-y-4">
            {/* Main Image */}
            <div className="relative bg-gunmetal-800 aspect-square rounded-sm border border-white/5 overflow-hidden group">
                <img
                    src={currentImage.url}
                    alt={currentImage.name || productName}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />

                {hasMultipleImages && (
                    <>
                        <button
                            onClick={goToPrevious}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            aria-label="Previous image"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={goToNext}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            aria-label="Next image"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>

                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white text-sm px-3 py-1 rounded-full">
                            {currentImageIndex + 1} / {images.length}
                        </div>
                    </>
                )}
            </div>

            {/* Thumbnail Grid */}
            {hasMultipleImages && (
                <div className="grid grid-cols-4 gap-2">
                    {images.map((image, index) => (
                        <button
                            key={image._id || index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`aspect-square rounded-sm border overflow-hidden transition-all ${
                                currentImageIndex === index
                                    ? 'border-gold-500 ring-2 ring-gold-500'
                                    : 'border-white/10 hover:border-white/20'
                            }`}
                        >
                            <img
                                src={image.url}
                                alt={image.name || `${productName} ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
