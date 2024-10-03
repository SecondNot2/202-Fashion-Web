import React, { useState, useEffect } from 'react';

const Banner = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    const slides = [
        {
            image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d',
            title: 'Bộ sưu tập mùa hè 2024',
            description: 'Khám phá xu hướng thời trang nổi bật của giới trẻ cho mùa hè này...',
            buttonText: 'Mua ngay'
        },
        {
            image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b',
            title: 'Phong cách Thu Đông',
            description: 'Ấm áp và thời trang với bộ sưu tập mới nhất của chúng tôi',
            buttonText: 'Khám phá ngay'
        },
        {
            image: 'https://images.unsplash.com/photo-1445205170230-053b83016050',
            title: 'Phụ kiện Độc đáo',
            description: 'Hoàn thiện phong cách của bạn với bộ sưu tập phụ kiện mới',
            buttonText: 'Xem thêm'
        }
    ];

    useEffect(() => {
        setIsVisible(true);
        const timer = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 5000);

        return () => clearInterval(timer);
    }, []);

    const currentSlideData = slides[currentSlide];

    const goToNextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    };

    const goToPrevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
    };

    return (
        <section className="relative h-[54.5rem] bg-cover bg-center overflow-hidden transition-all duration-500 ease-in-out" style={{ backgroundImage: `url('${currentSlideData.image}')` }}>
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className={`text-center transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} transition-all duration-1000 ease-out`}>
                    <h1 className="text-4xl font-bold text-white mb-4 animate-pulse">{currentSlideData.title}</h1>
                    <p className="text-xl text-white mb-8 animate-fade-in-down">{currentSlideData.description}</p>
                    <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition duration-300 transform hover:scale-105 active:scale-95">
                        {currentSlideData.buttonText}
                    </button>
                </div>
            </div>

            {/* Nút chuyển tiếp */}
            <button
                onClick={goToNextSlide}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 focus:outline-none transition duration-300"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>

            {/* Nút quay lại */}
            <button
                onClick={goToPrevSlide}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 focus:outline-none transition duration-300"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-white' : 'bg-gray-400'}`}
                        onClick={() => setCurrentSlide(index)}
                    />
                ))}
            </div>
        </section>
    );
};

export default Banner;