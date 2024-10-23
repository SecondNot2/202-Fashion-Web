import React from 'react';
import { motion } from 'framer-motion';

const ProductLabel = ({ label, discountPercent }) => {
    const getLabelStyle = (label) => {
        switch (label.toLowerCase()) {
            case 'new':
            case 'mới':
                return 'bg-green-500 text-white';
            case 'best-seller':
            case 'bán chạy':
                return 'bg-blue-500 text-white';
            case 'sale':
            case 'khuyến mãi':
                return 'bg-red-500 text-white';
            case 'discount':
            case 'giảm giá':
                return 'bg-red-500 text-white';
            default:
                return 'bg-gray-500 text-white';
        }
    };

    const getLabel = (label) => {
        if (label.toLowerCase() === 'discount' && discountPercent) {
            return `${discountPercent}% Giảm`;
        }
        return label;
    };

    return (
        <motion.span
            className={`px-2 py-1 text-xs font-semibold rounded ${getLabelStyle(label)}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
        >
            {getLabel(label)}
        </motion.span>
    );
};

export default ProductLabel;
