import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import LazyImage from '../atoms/LazyImage';
import AddToCartButton from '../atoms/AddToCartButton/AddToCartButton';
const RecommendedProducts = ({ showNotification }) => {
    const [cartItems, setCartItems] = useState(0);
    const [recommendedProducts, setRecommendedProducts] = useState([]);

    const allProducts = [
        { id: 1, name: "Áo thun phong cách", price: 299000, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab", category: "thời trang nam", label: "Mới" },
        { id: 2, name: "Đầm dạ hội", price: 899000, image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956", category: "thời trang nữ", label: "Bán chạy" },
        { id: 3, name: "Giày thể thao trẻ em", price: 499000, image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86", category: "thời trang trẻ em", label: "Giảm giá" },
        { id: 4, name: "Túi xách da", price: 1299000, image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3", category: "thời trang nữ", label: "Mới" }
    ];

    useEffect(() => {
        const getRecommendedProducts = () => {
            const shuffled = [...allProducts].sort(() => 0.5 - Math.random());
            return shuffled.slice(0, 4);
        };

        setRecommendedProducts(getRecommendedProducts());
    }, []);

    const addToCart = (product) => {
        setCartItems(prevItems => prevItems + 1);
        showNotification(`Đã thêm ${product.name} vào giỏ hàng!`);
    };

    return (
        <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto px-4 py-16"
        >
            <h2 className="text-3xl font-bold text-center mb-12">Sản phẩm gợi ý cho bạn</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {recommendedProducts.map((product, index) => (
                    <motion.div
                        key={product.id}
                        className="bg-white rounded-lg shadow-md overflow-hidden"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                    >
                        <div className="h-64 overflow-hidden">
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <LazyImage
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                    wrapperClassName="w-full h-full"
                                />
                            </motion.div>
                        </div>
                        <div className="p-4 flex-grow flex flex-col">
                            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-gray-600">{product.price.toLocaleString('vi-VN')} ₫</span>
                                <span className={`px-2 py-1 text-xs font-semibold rounded ${product.label === 'Mới' ? 'bg-green-500 text-white' : product.label === 'Bán chạy' ? 'bg-blue-500 text-white' : 'bg-red-500 text-white'}`}>
                                    {product.label}
                                </span>
                            </div>
                            <AddToCartButton
                                price={product.price}
                                primaryColor="blue"
                                secondaryColor="indigo"
                                onAddToCart={() => addToCart(product)}
                            />
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
};

export default RecommendedProducts;