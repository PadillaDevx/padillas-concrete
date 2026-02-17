import { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, MapPin, ZoomIn, ZoomOut } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function PhotoModal({ project, currentIndex, onClose, onPrev, onNext, onTouchStart, onTouchEnd }) {
    const { t } = useTranslation();
    const [isZoomed, setIsZoomed] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (!project) return;
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = ''; };
    }, [project]);

    // Reset zoom and loading when image changes
    useEffect(() => {
        setIsZoomed(false);
        setIsLoading(true);
    }, [currentIndex]);

    if (!project) return null;

    const { allPhotos, title, location } = project;

    // Direct index navigation for thumbnails
    const goToIndex = (targetIndex) => {
        if (targetIndex < currentIndex) {
            for (let i = currentIndex; i > targetIndex; i--) onPrev();
        } else if (targetIndex > currentIndex) {
            for (let i = currentIndex; i < targetIndex; i++) onNext();
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            role="dialog"
            aria-modal="true"
            aria-label={`${t('a11y.photoViewer')} - ${title}`}
        >
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/95 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative z-10 w-full max-w-6xl mx-4 animate-fade-in">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                    <div className="glass-card rounded-xl px-5 py-3">
                        <h3 className="text-xl md:text-2xl font-bold text-white text-shadow">{title}</h3>
                        {location && (
                            <p className="text-amber-400 flex items-center gap-1 mt-1">
                                <MapPin className="w-4 h-4" />
                                <span className="text-sm">{location}</span>
                            </p>
                        )}
                    </div>
                    <button 
                        onClick={onClose} 
                        className="glass-card p-3 rounded-full hover:bg-red-600/50 transition-all duration-300 group"
                        aria-label={t('a11y.closeModal')}
                    >
                        <X className="w-6 h-6 text-white group-hover:scale-110 transition-transform" aria-hidden="true" />
                    </button>
                </div>

                {/* Main Image Container */}
                <div
                    className="relative glass-card rounded-2xl overflow-hidden"
                    onTouchStart={onTouchStart}
                    onTouchEnd={onTouchEnd}
                >
                    {allPhotos.length > 0 ? (
                        <>
                            {/* Loading spinner */}
                            {isLoading && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
                                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
                                </div>
                            )}

                            {/* Image */}
                            <div className={`relative ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}>
                                <img
                                    src={allPhotos[currentIndex]}
                                    alt={`${title} - ${t('a11y.photoCounter', { current: currentIndex + 1, total: allPhotos.length })}`}
                                    className={`w-full transition-all duration-500 ${
                                        isZoomed 
                                            ? 'max-h-[85vh] object-contain scale-110' 
                                            : 'max-h-[60vh] md:max-h-[70vh] object-contain'
                                    }`}
                                    onClick={() => setIsZoomed(!isZoomed)}
                                    onLoad={() => setIsLoading(false)}
                                />
                            </div>

                            {/* Photo counter badge */}
                            <div className="absolute top-4 left-1/2 -translate-x-1/2 glass-card px-4 py-2 rounded-full" aria-live="polite">
                                <span className="text-white font-medium">
                                    {currentIndex + 1} <span className="text-gray-400">/</span> {allPhotos.length}
                                </span>
                            </div>

                            {/* Zoom button */}
                            <button 
                                onClick={() => setIsZoomed(!isZoomed)}
                                className="absolute top-4 right-4 glass-card p-2 rounded-full hover:bg-white/20 transition"
                                aria-label={isZoomed ? 'Zoom out' : 'Zoom in'}
                            >
                                {isZoomed ? (
                                    <ZoomOut className="w-5 h-5 text-white" />
                                ) : (
                                    <ZoomIn className="w-5 h-5 text-white" />
                                )}
                            </button>

                            {/* Navigation arrows */}
                            {currentIndex > 0 && (
                                <button 
                                    onClick={onPrev} 
                                    className="absolute left-4 top-1/2 -translate-y-1/2 glass-card p-3 md:p-4 rounded-full hover:bg-red-600/50 transition-all duration-300 group"
                                    aria-label={t('a11y.previousPhoto')}
                                >
                                    <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 text-white group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
                                </button>
                            )}
                            {currentIndex < allPhotos.length - 1 && (
                                <button 
                                    onClick={onNext} 
                                    className="absolute right-4 top-1/2 -translate-y-1/2 glass-card p-3 md:p-4 rounded-full hover:bg-red-600/50 transition-all duration-300 group"
                                    aria-label={t('a11y.nextPhoto')}
                                >
                                    <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-white group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                                </button>
                            )}
                        </>
                    ) : (
                        <div className="w-full h-96 flex items-center justify-center text-gray-400">
                            <div className="text-center">
                                <div className="text-6xl mb-4">📷</div>
                                <p>No photos available</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Thumbnail strip */}
                {allPhotos.length > 1 && (
                    <div className="mt-4 glass-card rounded-xl p-3">
                        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
                            {allPhotos.map((photo, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => goToIndex(idx)}
                                    className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden transition-all duration-300 ${
                                        idx === currentIndex 
                                            ? 'ring-2 ring-red-500 ring-offset-2 ring-offset-black/50 scale-105' 
                                            : 'opacity-60 hover:opacity-100'
                                    }`}
                                    aria-label={`View photo ${idx + 1}`}
                                >
                                    <img
                                        src={photo}
                                        alt={`Thumbnail ${idx + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Keyboard hint */}
                <p className="text-center text-gray-500 text-xs mt-3 hidden md:block">
                    Use <kbd className="px-2 py-0.5 bg-white/10 rounded text-gray-400">←</kbd> <kbd className="px-2 py-0.5 bg-white/10 rounded text-gray-400">→</kbd> arrow keys to navigate • <kbd className="px-2 py-0.5 bg-white/10 rounded text-gray-400">ESC</kbd> to close
                </p>
            </div>
        </div>
    );
}
