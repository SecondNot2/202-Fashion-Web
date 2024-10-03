import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import LazyImage from '../atoms/LazyImage';
import AddToCartButton from '../atoms/AddToCartButton/AddToCartButton';

const FeaturedProducts = ({ showNotification }) => {
    const [cartItems, setCartItems] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState('all');

    const products = [
        { id: 1, name: "Áo thun", price: 29.99, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab", category: "men's fashion", label: "New" },
        { id: 2, name: "Váy dài", price: 89.99, image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956", category: "women's fashion", label: "Best-Seller" },
        { id: 3, name: "Giày thể thao trẻ em", price: 49.99, image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86", category: "kids' fashion", label: "Sale" },
        { id: 4, name: "Túi xách", price: 129.99, image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3", category: "women's fashion", label: "New" }
    ];

    const filteredProducts = products.filter(product =>
        selectedCategory === "all" || product.category === selectedCategory
    );

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
            <h2 className="text-3xl font-bold text-center mb-12">Sản phẩm nổi bật</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {filteredProducts.map((product, index) => (
                    <motion.div
                        key={product.id}
                        className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                    >
                        <Link to={`/product/${product.id}`} className="flex-shrink-0 h-64 overflow-hidden">
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
                        </Link>
                        <div className="p-4 flex-grow flex flex-col">
                            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-gray-600">${product.price.toFixed(2)}</span>
                                <motion.span
                                    className={`px-2 py-1 text-xs font-semibold rounded ${product.label === 'New' ? 'bg-green-500 text-white' : product.label === 'Best-Seller' ? 'bg-blue-500 text-white' : 'bg-red-500 text-white'}`}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    {product.label}
                                </motion.span>
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

export default FeaturedProducts;