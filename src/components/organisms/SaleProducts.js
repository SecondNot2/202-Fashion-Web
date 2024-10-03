import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import LazyImage from '../atoms/LazyImage';
import AddToCartButton from '../atoms/AddToCartButton/AddToCartButton';

const SaleProducts = ({ showNotification }) => {
    const [cartItems, setCartItems] = useState(0);
    const [timeLeft, setTimeLeft] = useState({});

    const saleProducts = [
        { id: 5, name: "Váy mùa hè", price: 79.99, salePrice: 59.99, image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446", category: "Thời trang nữ", discount: 25, endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000) },
        { id: 6, name: "Áo khoác nam", price: 149.99, salePrice: 99.99, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5", category: "Thời trang nam", discount: 33, endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) },
        { id: 7, name: "Balo trẻ em", price: 39.99, salePrice: 29.99, image: "https://down-vn.img.susercontent.com/file/1613d45880daba79aa84d7511c5ba2c1", category: "Thời trang trẻ em", discount: 25, endTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000) },
    ];

    const addToCart = (product) => {
        setCartItems(prevItems => prevItems + 1);
        showNotification(`Đã thêm ${product.name} vào giỏ hàng!`);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            const newTimeLeft = {};
            saleProducts.forEach(product => {
                const difference = product.endTime - now;
                if (difference > 0) {
                    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                    const minutes = Math.floor((difference / 1000 / 60) % 60);
                    const seconds = Math.floor((difference / 1000) % 60);
                    newTimeLeft[product.id] = { days, hours, minutes, seconds };
                }
            });
            setTimeLeft(newTimeLeft);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto px-4 py-16 bg-gray-50"
        >
            <h2 className="text-3xl font-bold text-center mb-12">Ưu đãi</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {saleProducts.map((product, index) => (
                    <motion.div
                        key={product.id}
                        className="bg-white rounded-lg shadow-md overflow-hidden"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                    >
                        <div className="relative h-64 overflow-hidden">
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
                            <span className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 m-2 rounded">
                                {product.discount}% Giảm
                            </span>
                        </div>
                        <div className="p-4 flex-grow flex flex-col">
                            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-gray-600 line-through">${product.price.toFixed(2)}</span>
                                <span className="text-red-600 font-bold">${product.salePrice.toFixed(2)}</span>
                            </div>
                            <div className="text-sm text-gray-500 mb-4">
                                Kết thúc trong: {timeLeft[product.id] ? (
                                    <span>
                                        {timeLeft[product.id].days}d {timeLeft[product.id].hours}h {timeLeft[product.id].minutes}m {timeLeft[product.id].seconds}s
                                    </span>
                                ) : (
                                    <span>Hết hạn</span>
                                )}
                            </div>
                            <AddToCartButton
                                price={product.price * 23000}
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

export default SaleProducts;