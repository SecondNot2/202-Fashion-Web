import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaEye } from "react-icons/fa";
import LazyImage from "../atoms/LazyImage";
import AddToCartButton from "../atoms/AddToCartButton";
import ProductLabel from "../atoms/ProductLabel";
import { useQuickView } from "../../contexts/QuickViewContext";

const ProductCard = ({
  product,
  showNotification,
  colorScheme = "default",
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { openQuickView } = useQuickView();

  const formatTime = (time) => {
    if (!time) return "Đã kết thúc";
    const { days, hours, minutes, seconds } = time;
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    openQuickView(product);
  };

  const getColorScheme = () => {
    switch (colorScheme) {
      case "primary":
        return {
          bg: "bg-illustration-main",
          text: "text-card-highlight",
          secondaryText: "text-card-paragraph2",
          quickViewBg: "bg-bg-secondary",
          quickViewText: "text-card-highlight",
        };
      case "secondary":
        return {
          bg: "bg-card-bg",
          text: "text-card-headline",
          secondaryText: "text-card-paragraph",
          quickViewBg: "bg-bg-primary",
          quickViewText: "text-text-headline",
        };
      default:
        return {
          bg: "bg-illustration-main",
          text: "text-card-highlight",
          secondaryText: "text-card-paragraph2",
          quickViewBg: "bg-bg-secondary",
          quickViewText: "text-card-highlight",
        };
    }
  };

  const colors = getColorScheme();

  return (
    <>
      <motion.div
        className={`${colors.bg} rounded-lg shadow-md overflow-hidden flex flex-col relative`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.05 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link
          to={`/product/${product.id}`}
          className="flex-shrink-0 h-64 overflow-hidden relative"
        >
          <motion.div>
            <LazyImage
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              wrapperClassName="w-full h-full"
            />
          </motion.div>
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.2 }}
                className={`absolute bottom-0 left-0 right-0 ${colors.quickViewBg} bg-opacity-80 p-2 flex justify-center items-center`}
                onClick={handleQuickView}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex items-center cursor-pointer"
                >
                  <FaEye className={`${colors.quickViewText} text-xl mr-2`} />
                  <span className={`${colors.quickViewText} font-semibold`}>
                    Xem nhanh
                  </span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </Link>
        <div className="p-4 flex-grow flex flex-col">
          <h3 className={`text-lg font-semibold mb-2 ${colors.text}`}>
            {product.name}
          </h3>
          <div className="flex justify-between items-center mb-4">
            <span className={colors.secondaryText}>
              {product.salePrice ? (
                <>
                  <span className="line-through mr-2">
                    {product.price.toLocaleString("vi-VN")} ₫
                  </span>
                  <span className="text-illustration-tertiary font-bold ml-6">
                    {product.salePrice.toLocaleString("vi-VN")} ₫
                  </span>
                </>
              ) : (
                `${product.price.toLocaleString("vi-VN")} ₫`
              )}
            </span>
            {product.label && (
              <ProductLabel
                label={product.label}
                discountPercent={product.discountPercent}
              />
            )}
          </div>
          {product.timeLeft && (
            <div className={`text-sm ${colors.secondaryText} mb-4`}>
              Kết thúc trong: {formatTime(product.timeLeft)}
            </div>
          )}
          <AddToCartButton
            product={product}
            primaryColor="btn-primary"
            secondaryColor="btn-text"
          />
        </div>
      </motion.div>
    </>
  );
};

export default ProductCard;
