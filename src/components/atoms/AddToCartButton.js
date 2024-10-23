import React, { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from '../../contexts/CartContext';
import { useNotification } from '../../contexts/NotificationContext';

const AddToCartButton = ({
    product,
    primaryColor = "btn-primary",
    secondaryColor = "btn-text",
    onClick
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const { addToCart } = useCart();
    const { showNotification } = useNotification();

    // Kiểm tra xem product có tồn tại và có thuộc tính price không
    const displayPrice = product && typeof product.price === 'number' && !isNaN(product.price)
        ? product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
        : '-.--';

    const handleAddToCart = () => {
        if (onClick) {
            onClick();
        } else if (product) {
            addToCart(product);
            showNotification(`Đã thêm ${product.name} vào giỏ hàng!`, "success");
        } else {
            showNotification("Không thể thêm sản phẩm vào giỏ hàng.", "error");
        }
    };

    // Nếu không có sản phẩm, không hiển thị nút
    if (!product) {
        return null;
    }

    return (
        <motion.button
            className={`relative overflow-hidden bg-${primaryColor} text-${secondaryColor} font-semibold py-3 px-6 rounded-full transition-all duration-300 ease-in-out hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-opacity-75 shadow-lg hover:shadow-xl w-full`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleAddToCart}
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
                    <span className={`font-bold text-${secondaryColor}`}>{displayPrice}</span>
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
        'btn-primary': '#f9bc60',
        'btn-text': '#001e1d',
    };
    return colorMap[color] || colorMap['btn-primary'];
}

export default AddToCartButton;
