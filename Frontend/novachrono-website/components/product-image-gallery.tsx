'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductImageGalleryProps {
    images: any[] | undefined;
    productName: string;
}

export default function ProductImageGallery({
    images,
    productName,
}: ProductImageGalleryProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isMainLoaded, setIsMainLoaded] = useState(false);
    const [thumbLoaded, setThumbLoaded] = useState<boolean[]>([]);

    useEffect(() => {
        // initialize thumbnail loaded flags when images change
        setThumbLoaded(images ? images.map(() => false) : []);
        setIsMainLoaded(false);
    }, [images]);

    // If images are still loading (undefined) show an animated skeleton box.
    if (images === undefined) {
        return (
            <div className="bg-gunmetal-800 aspect-square rounded-sm border border-white/5 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-gray-300 dark:bg-zinc-700 animate-pulse">
                    <div className="h-24 w-24 rounded-md bg-gray-200 dark:bg-zinc-600" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
            </div>
        );
    }

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
                {/* Main skeleton */}
                {!isMainLoaded && (
                    <div className="absolute inset-0 z-20 flex items-center justify-center bg-gray-300 dark:bg-zinc-700 animate-pulse">
                        <div className="h-24 w-24 rounded-md bg-gray-200 dark:bg-zinc-600" />
                    </div>
                )}

                <img
                    src={currentImage.url}
                    alt={currentImage.name || productName}
                    onLoad={() => setIsMainLoaded(true)}
                    className={`absolute inset-0 z-10 w-full h-full object-cover transition-opacity duration-500 ${isMainLoaded ? 'opacity-100' : 'opacity-0'}`}
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
                                    className={`relative aspect-square rounded-sm border overflow-hidden transition-all ${
                                        currentImageIndex === index
                                            ? 'border-gold-500 ring-2 ring-gold-500'
                                            : 'border-white/10 hover:border-white/20'
                                    }`}
                                >
                                    {/* thumbnail skeleton */}
                                    {!thumbLoaded[index] && (
                                        <div className="absolute inset-0 z-20 flex items-center justify-center bg-gray-300 dark:bg-zinc-700 animate-pulse">
                                            <div className="h-6 w-6 rounded-md bg-gray-200 dark:bg-zinc-600" />
                                        </div>
                                    )}

                                    <img
                                        src={image.url}
                                        alt={image.name || `${productName} ${index + 1}`}
                                        onLoad={() => setThumbLoaded((prev) => {
                                            const next = [...prev];
                                            next[index] = true;
                                            return next;
                                        })}
                                        className={`absolute inset-0 z-10 w-full h-full object-cover transition-opacity duration-300 ${thumbLoaded[index] ? 'opacity-100' : 'opacity-0'}`}
                                    />
                                </button>
                    ))}
                </div>
            )}
        </div>
    );
}
