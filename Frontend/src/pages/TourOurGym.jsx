import { useState } from 'react';
import { ArrowLeft, Play, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function TourOurGym() {
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);

    // Gym areas and facilities data
    const gymAreas = [
        {
            title: "Cardio Zone",
            description: "State-of-the-art cardio equipment with entertainment systems and heart rate monitoring.",
            image: "/fitness-computer-desktop-backgrounds-wallpaper-preview.jpg",
            features: ["Treadmills with TV screens", "Elliptical machines", "Stationary bikes", "Rowing machines"]
        },
        {
            title: "Strength Training Area",
            description: "Complete free weights section with professional-grade equipment for all fitness levels.",
            image: "/pngtree-rows-of-dumbbells-in-the-gym-image_15662386.jpg",
            features: ["Full dumbbell rack (5-100 lbs)", "Olympic barbells", "Power racks", "Cable machines"]
        },
        {
            title: "Functional Training Space",
            description: "Open area designed for functional movements, CrossFit, and group training sessions.",
            image: "/pexels-victorfreitas-841130.jpg",
            features: ["Battle ropes", "Kettlebells", "Medicine balls", "TRX suspension trainers"]
        },
        {
            title: "Premium Facilities",
            description: "Luxury amenities to enhance your workout experience and recovery.",
            image: "/gettyimages-1410441629-640x640.jpg",
            features: ["Steam room & sauna", "Massage therapy rooms", "Juice bar", "Premium locker rooms"]
        },
        {
            title: "Group Fitness Studio",
            description: "Spacious studio for yoga, Pilates, Zumba, and other group fitness classes.",
            image: "/360_F_827876077_k0EWo3jSiWZPR8fRgsSbZFT9SkrozNuj.jpg",
            features: ["Mirrored walls", "Sound system", "Yoga mats provided", "Climate controlled"]
        },
        {
            title: "Elite Training Zone",
            description: "Premium area for serious athletes and advanced training programs.",
            image: "/unleash-your-strength-at-4k-gym-mqz006pbxscrtjga.jpg",
            features: ["Olympic lifting platform", "Competition equipment", "Personal training area", "Performance tracking"]
        }
    ];

    const allImages = gymAreas.map(area => area.image);

    const openImageModal = (image, index) => {
        setSelectedImage(image);
        setCurrentImageIndex(index);
    };

    const closeImageModal = () => {
        setSelectedImage(null);
    };

    const nextImage = () => {
        const nextIndex = (currentImageIndex + 1) % allImages.length;
        setCurrentImageIndex(nextIndex);
        setSelectedImage(allImages[nextIndex]);
    };

    const prevImage = () => {
        const prevIndex = (currentImageIndex - 1 + allImages.length) % allImages.length;
        setCurrentImageIndex(prevIndex);
        setSelectedImage(allImages[prevIndex]);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="text-white bg-gradient-to-r from-blue-700 to-blue-900">
                <div className="px-6 py-8 mx-auto max-w-7xl">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 mb-6 text-pink-300 transition hover:text-pink-200"
                    >
                        <ArrowLeft size={20} />
                        Back to Home
                    </button>

                    <div className="text-center">
                        <h1 className="mb-4 text-5xl font-bold">Tour Our Premium Gym</h1>
                        <p className="max-w-3xl mx-auto text-xl opacity-90">
                            Take a virtual tour of our state-of-the-art fitness facility. Explore our equipment,
                            amenities, and spaces designed to help you achieve your fitness goals.
                        </p>
                    </div>
                </div>
            </div>

            {/* Promotional Video Section */}
            <section className="py-16 bg-white">
                <div className="max-w-6xl px-6 mx-auto">
                    <div className="mb-12 text-center">
                        <h2 className="mb-4 text-4xl font-bold text-gray-900">Experience Fitness Sharks</h2>
                        <p className="text-xl text-gray-600">Watch our cinematic gym tour video</p>
                        <p className="mt-2 text-sm text-gray-500">
                            Having trouble with the video? <a href="/gym-tour-video.mp4" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Click here to open directly</a>
                        </p>
                    </div>

                    <div className="relative overflow-hidden bg-black shadow-2xl rounded-2xl">
                        <video
                            className="w-full h-auto"
                            controls
                            preload="metadata"
                            poster="/unleash-your-strength-at-4k-gym-mqz006pbxscrtjga.jpg"
                            onPlay={() => setIsVideoPlaying(true)}
                            onPause={() => setIsVideoPlaying(false)}
                            onError={(e) => {
                                console.error('Video error:', e);
                                console.error('Video error details:', e.target.error);
                            }}
                            onLoadStart={() => console.log('Video loading started')}
                            onLoadedData={() => console.log('Video data loaded')}
                            onCanPlay={() => console.log('Video can play')}
                        >
                            <source src="/gym-tour-video.mp4" type="video/mp4" />
                            <p>Your browser does not support the video tag. <a href="/gym-tour-video.mp4" download>Download the video</a></p>
                        </video>

                        {!isVideoPlaying && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        const video = e.target.closest('.relative').querySelector('video');
                                        if (video) {
                                            video.play().catch(err => console.error('Play failed:', err));
                                        }
                                    }}
                                    className="p-6 transition bg-pink-500 rounded-full cursor-pointer hover:bg-pink-600 focus:outline-none focus:ring-4 focus:ring-pink-300"
                                >
                                    <Play size={48} className="ml-2 text-white" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Gym Areas Gallery */}
            <section className="py-16 bg-gray-50">
                <div className="px-6 mx-auto max-w-7xl">
                    <div className="mb-16 text-center">
                        <h2 className="mb-4 text-4xl font-bold text-gray-900">Explore Our Facilities</h2>
                        <p className="text-xl text-gray-600">Click on any image to view our photo gallery</p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {gymAreas.map((area, index) => (
                            <div key={index} className="overflow-hidden transition-shadow bg-white shadow-lg rounded-2xl hover:shadow-xl">
                                <div
                                    className="relative h-64 cursor-pointer group"
                                    onClick={() => openImageModal(area.image, index)}
                                >
                                    <img
                                        src={area.image}
                                        alt={area.title}
                                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                                        onError={(e) => {
                                            console.error('Image failed to load:', area.image);
                                            e.target.style.backgroundColor = '#f3f4f6';
                                            e.target.style.color = '#6b7280';
                                            e.target.style.display = 'flex';
                                            e.target.style.alignItems = 'center';
                                            e.target.style.justifyContent = 'center';
                                            e.target.innerHTML = 'Image not found';
                                        }}
                                        onLoad={() => console.log('Image loaded successfully:', area.image)}
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 bg-black bg-opacity-0 group-hover:bg-opacity-20">
                                        <div className="p-3 transition-all duration-300 bg-white bg-opacity-0 rounded-full group-hover:bg-opacity-90">
                                            <svg className="w-6 h-6 text-gray-800 transition-opacity opacity-0 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <h3 className="mb-3 text-2xl font-bold text-gray-900">{area.title}</h3>
                                    <p className="mb-4 text-gray-600">{area.description}</p>

                                    <div className="space-y-2">
                                        <h4 className="font-semibold text-gray-900">Features:</h4>
                                        <ul className="space-y-1">
                                            {area.features.map((feature, featureIndex) => (
                                                <li key={featureIndex} className="flex items-center text-gray-600">
                                                    <span className="w-2 h-2 mr-3 bg-pink-500 rounded-full"></span>
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-16 text-white bg-gradient-to-r from-blue-700 to-blue-900">
                <div className="max-w-4xl px-6 mx-auto text-center">
                    <h2 className="mb-6 text-4xl font-bold">Ready to Start Your Fitness Journey?</h2>
                    <p className="mb-8 text-xl opacity-90">
                        Join thousands of members who have transformed their lives at Fitness Sharks.
                        Our world-class facilities and expert trainers are here to help you succeed.
                    </p>

                    <div className="flex flex-col justify-center gap-4 sm:flex-row">
                        <button
                            onClick={() => navigate('/#pricing')}
                            className="px-8 py-4 text-lg font-bold transition transform bg-pink-500 rounded-full hover:bg-pink-600 hover:scale-105"
                        >
                            View Membership Plans
                        </button>
                        <button
                            onClick={() => navigate('/trainers')}
                            className="px-8 py-4 text-lg font-bold text-blue-900 transition transform bg-white rounded-full hover:bg-gray-100 hover:scale-105"
                        >
                            Meet Our Trainers
                        </button>
                    </div>
                </div>
            </section>

            {/* Image Modal */}
            {selectedImage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-90">
                    <div className="relative max-w-6xl max-h-full">
                        <button
                            onClick={closeImageModal}
                            className="absolute z-10 text-white top-4 right-4 hover:text-pink-300"
                        >
                            <X size={32} />
                        </button>

                        <button
                            onClick={prevImage}
                            className="absolute z-10 text-white transform -translate-y-1/2 left-4 top-1/2 hover:text-pink-300"
                        >
                            <ChevronLeft size={48} />
                        </button>

                        <button
                            onClick={nextImage}
                            className="absolute z-10 text-white transform -translate-y-1/2 right-4 top-1/2 hover:text-pink-300"
                        >
                            <ChevronRight size={48} />
                        </button>

                        <img
                            src={selectedImage}
                            alt="Gym facility"
                            className="object-contain max-w-full max-h-full rounded-lg"
                        />

                        <div className="absolute text-center text-white transform -translate-x-1/2 bottom-4 left-1/2">
                            <p className="text-lg font-semibold">{gymAreas[currentImageIndex]?.title}</p>
                            <p className="text-sm opacity-75">{currentImageIndex + 1} of {allImages.length}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}