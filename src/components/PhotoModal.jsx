import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function PhotoModal({ project, currentIndex, onClose, onPrev, onNext, onTouchStart, onTouchEnd }) {
    if (!project) return null;

    const { allPhotos, title, location } = project;

    return (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="max-w-4xl w-full bg-white rounded-2xl overflow-hidden">
                <div className="flex justify-between items-center p-6 border-b">
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
                        <p className="text-gray-600">{location}</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div
                    className="relative bg-gray-900"
                    onTouchStart={onTouchStart}
                    onTouchEnd={onTouchEnd}
                >
                    {allPhotos.length > 0 ? (
                        <>
                            <img
                                src={allPhotos[currentIndex]}
                                alt={`Photo ${currentIndex + 1}`}
                                className="w-full h-96 object-contain"
                            />
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full">
                                {currentIndex + 1} / {allPhotos.length}
                            </div>
                            {currentIndex > 0 && (
                                <button onClick={onPrev} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full hover:bg-white transition">
                                    <ChevronLeft className="w-6 h-6" />
                                </button>
                            )}
                            {currentIndex < allPhotos.length - 1 && (
                                <button onClick={onNext} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full hover:bg-white transition">
                                    <ChevronRight className="w-6 h-6" />
                                </button>
                            )}
                        </>
                    ) : (
                        <div className="w-full h-96 flex items-center justify-center text-gray-500">
                            No photos available
                        </div>
                    )}
                </div>

                <div className="p-6 border-t">
                    <button onClick={onClose} className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition font-semibold">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
