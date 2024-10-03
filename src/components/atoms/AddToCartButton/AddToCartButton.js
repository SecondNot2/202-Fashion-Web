import React, { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";

const AddToCartButton = ({
    price = 199000,
    primaryColor = "indigo",
    secondaryColor = "purple",
    onAddToCart
}) => {
    const [isHovered, setIsHovered] = useState(false);

    const displayPrice = typeof price === 'number' && !isNaN(price)
        ? price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
        : '-.--';

    const handleAddToCart = () => {
        console.log("Đã thêm vào giỏ hàng!");
        if (onAddToCart) {
            onAddToCart();
        }
    };

    return (
        <motion.button
            className={`relative overflow-hidden bg-${primaryColor}-500 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 ease-in-out hover:bg-${primaryColor}-600 focus:outline-none focus:ring-2 focus:ring-${primaryColor}-400 focus:ring-opacity-75 shadow-lg hover:shadow-xl`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleAddToCart}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.95 }}
        >
            <span className="flex items-center justify-center">
                <motion.div
                    animate={{ rotate: isHovered ? 12 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                </motion.div>
                <motion.span
                    initial={{ opacity: 1, scale: 1 }}
                    animate={{ opacity: isHovered ? 0 : 1, scale: isHovered ? 0.5 : 1 }}
                    transition={{ duration: 0.3 }}
                >
                    Thêm vào giỏ hàng
                </motion.span>
                <motion.span
                    className={`absolute left-0 w-full text-center`}
                    initial={{ opacity: 0, y: '100%' }}
                    animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : '100%' }}
                    transition={{ duration: 0.3 }}
                >
                    <span className={`font-bold text-${secondaryColor}-300`}>{displayPrice}</span>
                </motion.span>
            </span>
            <motion.span
                className={`absolute inset-0 h-full w-full rounded-full`}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: isHovered ? 1 : 0, opacity: isHovered ? 0.25 : 0 }}
                transition={{ duration: 0.3 }}
                style={{
                    background: `radial-gradient(circle, transparent 10%, ${getColorValue(primaryColor)} 70%)`
                }}
            ></motion.span>
        </motion.button>
    );
};

function getColorValue(color) {
    const colorMap = {
        indigo: '#4F46E5',
        purple: '#9333EA',
        blue: '#3B82F6',
        green: '#10B981',
        red: '#EF4444',
        // Thêm các màu khác nếu cần
    };
    return colorMap[color] || colorMap.indigo;
}

export default AddToCartButton;