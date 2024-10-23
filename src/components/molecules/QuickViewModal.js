import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaCheck, FaMinus, FaPlus } from 'react-icons/fa';
import LazyImage from '../atoms/LazyImage';
import AddToCartButton from '../atoms/AddToCartButton';
import ProductLabel from '../atoms/ProductLabel';
import { useQuickView } from '../../contexts/QuickViewContext';
import { useNotification } from '../../contexts/NotificationContext';
import { useCart } from '../../contexts/CartContext';

const QuickViewModal = () => {
    const { isOpen, product, closeQuickView } = useQuickView();
    const { showNotification } = useNotification();
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    useEffect(() => {
        setSelectedSize('');
        setSelectedColor('');
        setQuantity(1);
    }, [product]);

    if (!isOpen || !product) return null;

    const sizes = product.sizes || ['S', 'M', 'L', 'XL'];
    const colors = product.colors || [
        { name: 'Trắng', hex: '#FFFFFF' },
        { name: 'Đen', hex: '#000000' },
        { name: 'Xanh', hex: '#00FF00' },
        { name: 'Đỏ', hex: '#FF0000' },
    ];

    const handleQuantityChange = (change) => {
        setQuantity(prevQuantity => Math.max(1, prevQuantity + change));
    };

    const handleAddToCart = () => {
        let errorMessage = '';

        if (sizes.length > 0 && !selectedSize) {
            errorMessage += 'Vui lòng chọn kích thước. ';
        } else if (colors.length > 0 && !selectedColor) {
            errorMessage += 'Vui lòng chọn màu sắc. ';
        }

        if (errorMessage) {
            showNotification(errorMessage.trim(), "warning");
            return;
        }

        const productToAdd = {
            ...product,
            size: selectedSize || undefined,
            color: selectedColor || undefined,
            quantity
        };

        addToCart(productToAdd);
        showNotification(`Đã thêm ${quantity} ${product.name} vào giỏ hàng!`, "success");
        closeQuickView();
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center overflow-auto"
            >
                <motion.div
                    className="fixed inset-0 bg-bg-primary opacity-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    exit={{ opacity: 0 }}
                    onClick={closeQuickView}
                />
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-card-bg p-6 rounded-lg shadow-xl max-w-4xl w-full mx-4 relative z-50"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        onClick={closeQuickView}
                        className="absolute top-4 right-4 text-text-paragraph hover:text-text-headline"
                    >
                        <FaTimes size={24} />
                    </button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-center justify-center">
                            <div className="max-w-md relative overflow-hidden rounded-lg">
                                <LazyImage
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-contain"
                                    wrapperClassName="w-full h-full"
                                />
                            </div>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-2 text-card-headline">{product.name}</h2>
                            <div className="flex items-center mb-4">
                                <span className="text-xl font-semibold mr-4 text-card-headline">
                                    {product.salePrice
                                        ? `${product.salePrice.toLocaleString('vi-VN')} ₫`
                                        : `${product.price.toLocaleString('vi-VN')} ₫`
                                    }
                                </span>
                                {product.salePrice && (
                                    <span className="text-card-paragraph line-through mr-6">
                                        {product.price.toLocaleString('vi-VN')} ₫
                                    </span>
                                )}
                                {product.label && (
                                    <ProductLabel
                                        label={product.label}
                                        discountPercent={product.discountPercent}
                                    />
                                )}
                            </div>
                            <p className="text-card-paragraph mb-4">{product.description || 'Chưa có mô tả sản phẩm.'}</p>

                            {sizes.length > 0 && (
                                <div className="mb-4">
                                    <h3 className="font-semibold mb-2 text-card-headline">Kích thước:</h3>
                                    <div className="flex space-x-2">
                                        {sizes.map(size => (
                                            <button
                                                key={size}
                                                className={`px-3 py-1 border rounded ${selectedSize === size ? 'bg-btn-primary text-btn-text' : 'bg-card-bg text-card-paragraph'}`}
                                                onClick={() => setSelectedSize(size)}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {colors.length > 0 && (
                                <div className="mb-4">
                                    <h3 className="font-semibold mb-2 text-card-headline">Màu sắc:</h3>
                                    <div className="flex space-x-2">
                                        {colors.map(color => (
                                            <button
                                                key={color.name}
                                                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${selectedColor === color.name ? 'border-btn-primary' : 'border-card-paragraph'}`}
                                                style={{ backgroundColor: color.hex }}
                                                onClick={() => setSelectedColor(color.name)}
                                                title={color.name}
                                            >
                                                {selectedColor === color.name && <FaCheck className={`text-${color.name === 'Trắng' ? 'black' : 'white'}`} />}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="mb-4 mt-8 relative border-2 border-dashed border-btn-primary rounded-lg p-6">
                                <h3 className="font-semibold absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-card-bg px-2 text-btn-primary mt-[-5px]">
                                    KHUYẾN MÃI - ƯU ĐÃI
                                </h3>
                                <ul className="text-card-paragraph list-disc list-inside space-y-1">
                                    <li>Chuyển khoản với đơn hàng từ 500k trở lên</li>
                                    <li>Đồng giá ship toàn quốc 30k</li>
                                    <li>Hỗ trợ trả lời thắc mắc qua <a href="https://m.me/second.not2" className="text-link hover:underline" target="_blank" rel="noopener noreferrer">fanpage chính thức</a></li>
                                    <li>Khuyến mãi trực tiếp trên giá sản phẩm</li>
                                    <li>Đổi trả nếu có lỗi bất kì từ nhà sản xuất</li>
                                </ul>
                            </div>

                            <div className="flex items-center space-x-4 mt-8">
                                <div className="flex items-center border rounded-xl">
                                    <button
                                        className="px-2 py-4 border rounded-l-xl hover:bg-bg-secondary text-card-paragraph"
                                        onClick={() => handleQuantityChange(-1)}
                                    >
                                        <FaMinus />
                                    </button>
                                    <span className="px-7 py-1 text-card-headline">{quantity}</span>
                                    <button
                                        className="px-2 py-4 border rounded-r-xl hover:bg-bg-secondary text-card-paragraph"
                                        onClick={() => handleQuantityChange(1)}
                                    >
                                        <FaPlus />
                                    </button>
                                </div>
                                <AddToCartButton
                                    product={product}
                                    onClick={handleAddToCart}
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default QuickViewModal;
