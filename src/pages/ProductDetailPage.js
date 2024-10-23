import React, { useState, useCallback, useEffect, useRef } from "react";
import { FaShare, FaStar, FaChevronLeft, FaChevronRight, FaHeart, FaThumbsUp, FaComment, FaHome, FaChevronRight as FaChevronRightSmall, FaMinus, FaPlus } from "react-icons/fa";
import { MdZoomIn, MdClose } from "react-icons/md";
import { useNotification } from '../contexts/NotificationContext';
import { useCart } from '../contexts/CartContext';
import AddToCartButton from '../components/atoms/AddToCartButton';
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { useAnimation } from "framer-motion";
import { Link } from "react-router-dom";

const ProductDetailPage = () => {
    const { showNotification } = useNotification();
    const { addToCart } = useCart();
    const [currentImage, setCurrentImage] = useState(0);
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [isZoomed, setIsZoomed] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [fullscreenImage, setFullscreenImage] = useState(null);
    const [fullscreenImageIndex, setFullscreenImageIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const dragX = useMotionValue(0);
    const dragProgress = useTransform(dragX, [-200, 200], [1, -1]);
    const dragOpacity = useTransform(dragProgress, [-1, 0, 1], [0.5, 1, 0.5]);
    const dragScale = useTransform(dragProgress, [-1, 0, 1], [0.95, 1, 0.95]);
    const [animation, setAnimation] = useState({ x: 0 });
    const [dragStartX, setDragStartX] = useState(0);
    const imageRef = useRef(null);
    const [isFullscreenModalOpen, setIsFullscreenModalOpen] = useState(false);

    const product = {
        name: "Đầm dạ hội sang trọng",
        price: 6999000,
        description: "Một chiếc đầm dạ hội tuyệt đẹp phù hợp cho các dịp trang trọng. Được làm từ lụa cao cấp và có các chi tiết đính cườm tinh tế.",
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["Đen", "Xanh đậm", "Đỏ đô"],
        images: [
            "https://images.unsplash.com/photo-1566174053879-31528523f8ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
        ],
        reviews: [
            { id: 1, user: "Hương", rating: 5, comment: "Chiếc đầm tuyệt đẹp! Vừa vặn như mơ.", date: "2022-01-01", images: [] },
            { id: 2, user: "Mai", rating: 4, comment: "Đầm rất đẹp, nhưng hơi nhỏ một chút.", date: "2022-01-02", images: [] }
        ],
        averageRating: 4.5,
        totalReviews: 24,
        ratingDistribution: {
            5: 15,
            4: 6,
            3: 2,
            2: 1,
            1: 0
        }
    };

    const similarProducts = [
        {
            id: 1,
            name: "Đầm cocktail ren",
            price: 4999000,
            image: "https://images.unsplash.com/photo-1562137369-1a1a0bc66744?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
        },
        {
            id: 2,
            name: "Đầm dạ hội satin",
            price: 7999000,
            image: "https://lh6.googleusercontent.com/proxy/pEKRmlKERXqeNzGk8KAhM2yvBVDLJTxTJUw6AolE0YxlgxHFWUf68yXm-zatgc6FnzCwJT5THtNT2OEzqPGjUrgvZ4cwd95tllT3MQtxZ7gb65BLrJAXPag"
        },
        {
            id: 3,
            name: "Đầm maxi voan",
            price: 5999000,
            image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
        }
    ];

    const nextImage = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % product.images.length);
    };

    const prevImage = () => {
        setActiveIndex((prevIndex) => (prevIndex - 1 + product.images.length) % product.images.length);
    };

    const handleQuantityChange = (change) => {
        setQuantity(prevQuantity => Math.max(1, prevQuantity + change));
    };

    const handleAddToCart = () => {
        if (!selectedSize) {
            showNotification("Vui lòng chọn kích thước trước khi thêm vào giỏ hàng.", "warning");
            return;
        }
        if (!selectedColor) {
            showNotification("Vui lòng chọn màu sắc trước khi thêm vào giỏ hàng.", "warning");
            return;
        }

        const productToAdd = {
            ...product,
            size: selectedSize,
            color: selectedColor,
            quantity: quantity
        };
        addToCart(productToAdd);
        showNotification(`Đã thêm ${quantity} ${product.name} vào giỏ hàng!`, "success");
    };

    const handleShare = () => {
        alert("Chức năng chia sẻ sẽ được triển khai sau.");
    };

    const handleZoom = () => {
        setIsZoomed(!isZoomed);
    };

    const handleImageChange = (direction) => {
        if (direction === "next") {
            setCurrentImage((prev) => (prev + 1) % product.images.length);
        } else {
            setCurrentImage((prev) => (prev - 1 + product.images.length) % product.images.length);
        }
    };

    const handleFavorite = () => {
        setIsFavorite(!isFavorite);
        showNotification(isFavorite ? "Đã xóa khỏi danh sách yêu thích" : "Đã thêm vào danh sách yêu thích");
    };

    const handleImageClick = (image) => {
        // Xử lý sự kiện khi người dùng nhấp vào hình ảnh đánh giá
    };

    const openFullscreenImage = (index) => {
        setFullscreenImageIndex(index);
        setFullscreenImage(product.images[index]);
        setIsFullscreenModalOpen(true);
    };

    const closeFullscreenImage = () => {
        setFullscreenImage(null);
        setFullscreenImageIndex(0);
        setIsFullscreenModalOpen(false);
    };

    const nextFullscreenImage = () => {
        setFullscreenImageIndex((prevIndex) => (prevIndex + 1) % product.images.length);
    };

    const prevFullscreenImage = () => {
        setFullscreenImageIndex((prevIndex) => (prevIndex - 1 + product.images.length) % product.images.length);
    };

    const handleDragStart = (event) => {
        setIsDragging(true);
        setDragStartX(event.clientX);
    };

    const handleDrag = (event) => {
        if (!isDragging) return;
        const dragDistance = event.clientX - dragStartX;
        dragX.set(dragDistance);
    };

    const handleDragEnd = () => {
        const draggedDistance = dragX.get();
        if (Math.abs(draggedDistance) > 100) {
            if (draggedDistance < 0) {
                nextFullscreenImage();
            } else {
                prevFullscreenImage();
            }
        }
        setIsDragging(false);
        dragX.set(0);
    };

    useEffect(() => {
        if (!isDragging) {
            setAnimation({ x: 0 });
        }
    }, [isDragging]);

    useEffect(() => {
        setFullscreenImage(product.images[fullscreenImageIndex]);
    }, [fullscreenImageIndex, product.images]);

    const renderFullscreenImage = useCallback(() => {
        if (!isFullscreenModalOpen) return null;

        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
                onClick={closeFullscreenImage}
            >
                <motion.div
                    className="relative w-full h-full flex items-center justify-center"
                    onMouseDown={handleDragStart}
                    onMouseMove={handleDrag}
                    onMouseUp={handleDragEnd}
                    onMouseLeave={handleDragEnd}
                >
                    <motion.img
                        key={fullscreenImageIndex}
                        ref={imageRef}
                        src={fullscreenImage}
                        alt="Fullscreen product image"
                        className="max-w-full max-h-full object-contain"
                        style={{
                            x: dragX,
                            cursor: isDragging ? 'grabbing' : 'grab',
                        }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onClick={(e) => e.stopPropagation()}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    />
                </motion.div>
                <button
                    className="absolute top-4 right-4 text-white text-4xl"
                    onClick={closeFullscreenImage}
                >
                    <MdClose />
                </button>
                <button
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full"
                    onClick={(e) => {
                        e.stopPropagation();
                        prevFullscreenImage();
                    }}
                >
                    <FaChevronLeft className="text-black" />
                </button>
                <button
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full"
                    onClick={(e) => {
                        e.stopPropagation();
                        nextFullscreenImage();
                    }}
                >
                    <FaChevronRight className="text-black" />
                </button>
            </motion.div>
        );
    }, [isFullscreenModalOpen, fullscreenImage, fullscreenImageIndex, dragX, isDragging, handleDragStart, handleDrag, handleDragEnd, closeFullscreenImage]);

    return (
        <div className="pt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Breadcrumb navigation */}
                <nav className="flex mb-6" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-3">
                        <li className="inline-flex items-center">
                            <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-indigo-600">
                                <FaHome className="mr-2" />
                                Trang chủ
                            </Link>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <FaChevronRightSmall className="text-gray-400 mx-2" />
                                <Link to="/category/women" className="text-sm font-medium text-gray-700 hover:text-indigo-600">
                                    Thời trang nữ
                                </Link>
                            </div>
                        </li>
                        <li aria-current="page">
                            <div className="flex items-center">
                                <FaChevronRightSmall className="text-gray-400 mx-2" />
                                <span className="text-sm font-medium text-gray-500">{product.name}</span>
                            </div>
                        </li>
                    </ol>
                </nav>

                <div className="flex flex-col lg:flex-row">
                    {/* Thư viện ảnh sản phẩm */}
                    <div className="lg:w-1/2 mb-8 lg:mb-0">
                        {/* Ảnh lớn */}
                        <div className="relative overflow-hidden rounded-lg shadow-lg aspect-w-3 aspect-h-4">
                            <motion.img
                                key={activeIndex}
                                src={product.images[activeIndex]}
                                alt={`Sản phẩm ${activeIndex + 1}`}
                                className="w-full h-[45rem] object-cover cursor-pointer"
                                initial={{ opacity: 0.7 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                onClick={() => openFullscreenImage(activeIndex)}
                            />
                            <button
                                onClick={prevImage}
                                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10"
                                aria-label="Ảnh trước"
                            >
                                <FaChevronLeft className="text-gray-800" />
                            </button>
                            <button
                                onClick={nextImage}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10"
                                aria-label="Ảnh tiếp theo"
                            >
                                <FaChevronRight className="text-gray-800" />
                            </button>
                        </div>
                        {/* Ảnh nhỏ */}
                        <div className="flex mt-4 space-x-2">
                            {product.images.map((image, index) => {
                                if (index === activeIndex) return null;
                                return (
                                    <motion.div
                                        key={index}
                                        className="w-20 h-20 flex-shrink-0"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        <img
                                            src={image}
                                            alt={`Ảnh nhỏ ${index + 1}`}
                                            className="w-full h-full object-cover rounded cursor-pointer transition-transform duration-300 hover:scale-105"
                                            onClick={() => setActiveIndex(index)}
                                        />
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Chi tiết sản phẩm */}
                    <div className="lg:w-1/2 lg:pl-12">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
                        <p className="text-2xl font-semibold text-indigo-600 mb-6">{product.price.toLocaleString('vi-VN')} ₫</p>
                        <p className="text-gray-700 mb-6">{product.description}</p>

                        {/* Chọn kích thước */}
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold mb-2">Kích thước:</h2>
                            <div className="flex space-x-2">
                                {product.sizes.map((size) => (
                                    <button
                                        key={size}
                                        className={`px-4 py-2 border rounded ${selectedSize === size ? "bg-indigo-600 text-white" : "text-gray-700"}`}
                                        onClick={() => setSelectedSize(size)}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Chọn màu sắc */}
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold mb-2">Màu sắc:</h2>
                            <div className="flex space-x-2">
                                {product.colors.map((color) => {
                                    let bgColor;
                                    switch (color.toLowerCase()) {
                                        case 'đen':
                                            bgColor = 'bg-black';
                                            break;
                                        case 'xanh đậm':
                                            bgColor = 'bg-blue-800';
                                            break;
                                        case 'ỏ đô':
                                            bgColor = 'bg-red-800';
                                            break;
                                        default:
                                            bgColor = 'bg-gray-300';
                                    }
                                    return (
                                        <button
                                            key={color}
                                            className={`w-8 h-8 rounded-full border-2 ${bgColor} ${selectedColor === color ? "ring-2 ring-indigo-500" : ""}`}
                                            onClick={() => setSelectedColor(color)}
                                            aria-label={`Chọn màu ${color}`}
                                        ></button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Nút Thêm vào giỏ hàng, Yêu thích và Chia sẻ */}
                        <div className="flex items-center space-x-4 mb-8">
                            <div className="flex items-center border rounded-xl">
                                <button
                                    className="px-2 py-4 border rounded-l-xl hover:bg-gray-300"
                                    onClick={() => handleQuantityChange(-1)}
                                >
                                    <FaMinus />
                                </button>
                                <span className="px-7 py-1">{quantity}</span>
                                <button
                                    className="px-2 py-4 border rounded-r-xl hover:bg-gray-300"
                                    onClick={() => handleQuantityChange(1)}
                                >
                                    <FaPlus />
                                </button>
                            </div>
                            <AddToCartButton
                                product={{ ...product, size: selectedSize, color: selectedColor, quantity: quantity }}
                                showNotification={showNotification}
                                onClick={handleAddToCart}
                            />
                            <button
                                onClick={handleFavorite}
                                className={`bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition duration-300 ${isFavorite ? 'text-red-500' : ''}`}
                                aria-label={isFavorite ? 'Xóa khỏi danh sách yêu thích' : 'Thêm vào danh sách yêu thích'}
                            >
                                <FaHeart className={isFavorite ? 'fill-current' : 'stroke-current'} />
                            </button>
                            <button
                                onClick={handleShare}
                                className="bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition duration-300"
                                aria-label="Chia sẻ sản phẩm"
                            >
                                <FaShare />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Phần đánh giá */}
                <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
                    <h2 className="text-2xl font-semibold mb-6">Đánh giá của khách hàng</h2>

                    <div className="flex flex-col md:flex-row mb-8">
                        <div className="md:w-1/3 mb-6 md:mb-0">
                            <div className="text-center">
                                <p className="text-5xl font-bold text-indigo-600">{product.averageRating.toFixed(1)}</p>
                                <div className="flex justify-center my-2">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar
                                            key={i}
                                            className={i < Math.round(product.averageRating) ? "text-yellow-400" : "text-gray-300"}
                                            size={24}
                                        />
                                    ))}
                                </div>
                                <p className="text-gray-600">{product.totalReviews} đánh giá</p>
                            </div>
                        </div>

                        <div className="md:w-2/3 md:pl-8">
                            {Object.entries(product.ratingDistribution).reverse().map(([rating, count]) => (
                                <div key={rating} className="flex items-center mb-2">
                                    <span className="w-12 text-sm text-gray-600">{rating} sao</span>
                                    <div className="flex-grow mx-4 bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-yellow-400 h-2 rounded-full"
                                            style={{ width: `${(count / product.totalReviews) * 100}%` }}
                                        ></div>
                                    </div>
                                    <span className="w-12 text-sm text-gray-600 text-right">{count}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {product.reviews.map((review) => (
                        <motion.div
                            key={review.id}
                            className="mb-6 p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                                    <span className="text-xl font-semibold text-gray-600">{review.user.charAt(0)}</span>
                                </div>
                                <div>
                                    <p className="font-semibold text-lg">{review.user}</p>
                                    <div className="flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                whileHover={{ scale: 1.2 }}
                                                whileTap={{ scale: 0.9 }}
                                            >
                                                <FaStar
                                                    className={i < review.rating ? "text-yellow-400" : "text-gray-300"}
                                                    size={18}
                                                />
                                            </motion.div>
                                        ))}
                                        <span className="ml-2 text-sm text-gray-600">
                                            {new Date(review.date).toLocaleDateString('vi-VN')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                            {review.images && review.images.length > 0 && (
                                <div className="mt-4 flex space-x-2">
                                    {review.images.map((image, index) => (
                                        <img
                                            key={index}
                                            src={image}
                                            alt={`Review image ${index + 1}`}
                                            className="w-20 h-20 object-cover rounded-md cursor-pointer hover:opacity-80 transition-opacity duration-300"
                                            onClick={() => handleImageClick(image)}
                                        />
                                    ))}
                                </div>
                            )}
                            <div className="mt-4 flex items-center text-sm text-gray-500">
                                <motion.button
                                    className="flex items-center mr-4 hover:text-blue-500"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <FaThumbsUp className="mr-1" /> Hữu ích (12)
                                </motion.button>
                                <motion.button
                                    className="flex items-center hover:text-blue-500"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <FaComment className="mr-1" /> Bình luận (3)
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}

                    <motion.button
                        className="mt-4 bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition-colors duration-300 shadow-md"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Xem tất cả {product.totalReviews} đánh giá
                    </motion.button>
                </div>

                {/* Phần sản phẩm tương tự */}
                <div className="mt-12">
                    <h2 className="text-2xl font-semibold mb-6">Sản phẩm tương tự</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {similarProducts.map((product) => (
                            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
                                <Link to={`/product/${product.id}`}>
                                    <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
                                </Link>
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                                    <p className="text-indigo-600 font-semibold">{product.price.toLocaleString('vi-VN')} ₫</p>
                                    <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300">
                                        Xem chi tiết
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Fullscreen Image Modal */}
            <AnimatePresence>
                {renderFullscreenImage()}
            </AnimatePresence>
        </div>
    );
};

export default ProductDetailPage;
