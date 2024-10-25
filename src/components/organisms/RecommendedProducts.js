import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import ProductCard from "../molecules/ProductCard";

const RecommendedProducts = ({ showNotification }) => {
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  const allProducts = useMemo(
    () => [
      {
        id: 1,
        name: "Áo thun phong cách",
        price: 199000,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
        category: "thời trang nam",
        label: "New",
      },
      {
        id: 2,
        name: "Đầm dạ hội",
        price: 899000,
        image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956",
        category: "thời trang nữ",
        label: "Best-Seller",
      },
      {
        id: 3,
        name: "Giày thể thao trẻ em",
        price: 499000,
        image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86",
        category: "thời trang trẻ em",
        label: "Sale",
      },
      {
        id: 4,
        name: "Túi xách da",
        price: 1299000,
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3",
        category: "thời trang nữ",
        label: "New",
      },
    ],
    []
  );

  useEffect(() => {
    const getRecommendedProducts = () => {
      const shuffled = [...allProducts].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 4);
    };

    setRecommendedProducts(getRecommendedProducts());
  }, [allProducts]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-bg-primary py-16"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <h2 className="text-3xl font-bold text-center mb-12 text-text-headline">
          Sản phẩm gợi ý cho bạn
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {recommendedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              showNotification={showNotification}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default RecommendedProducts;
