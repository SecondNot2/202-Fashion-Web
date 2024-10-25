import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import ProductCard from "../molecules/ProductCard";

const SaleProducts = ({ showNotification }) => {
  const [timeLeft, setTimeLeft] = useState({});

  const saleProducts = useMemo(
    () => [
      {
        id: 5,
        name: "Váy mùa hè",
        price: 799000,
        salePrice: 599000,
        image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446",
        category: "Thời trang nữ",
        discount: 25,
        endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      },
      {
        id: 6,
        name: "Áo khoác nam",
        price: 1499000,
        salePrice: 999000,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5",
        category: "Thời trang nam",
        discount: 33,
        endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      },
      {
        id: 7,
        name: "Balo trẻ em",
        price: 399000,
        salePrice: 299000,
        image:
          "https://down-vn.img.susercontent.com/file/1613d45880daba79aa84d7511c5ba2c1",
        category: "Thời trang trẻ em",
        discount: 25,
        endTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      },
    ],
    []
  ); // Mảng dependencies rỗng vì dữ liệu không thay đổi

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const newTimeLeft = {};
      saleProducts.forEach((product) => {
        const difference = product.endTime - now;
        if (difference > 0) {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((difference / 1000 / 60) % 60);
          const seconds = Math.floor((difference / 1000) % 60);
          newTimeLeft[product.id] = { days, hours, minutes, seconds };
        } else {
          newTimeLeft[product.id] = null; // Hết thời gian giảm giá
        }
      });
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, [saleProducts]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-bg-secondary py-16"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <h2 className="text-3xl font-bold text-center mb-12 text-card-highlight">
          Ưu đãi
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {saleProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={{
                ...product,
                label: "discount",
                discountPercent: product.discount,
                timeLeft: timeLeft[product.id],
              }}
              showNotification={showNotification}
              colorScheme="secondary"
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default SaleProducts;
