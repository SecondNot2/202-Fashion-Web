import React from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const CustomerReviews = () => {
  const customerReviews = [
    {
      id: 1,
      name: "Anh Thắng",
      rating: 5,
      comment:
        "Tôi hoàn toàn yêu thích chất lượng của quần áo! Chiếc váy mùa hè tôi mua thật hoàn hảo cho mùa này.",
      image: "/images/avatar.png",
      productImage:
        "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446",
      productName: "Váy mùa hè",
      productSize: "M",
      productColor: "Trắng",
      productId: "product-1",
    },
    {
      id: 2,
      name: "CALL ME 202",
      rating: 4,
      comment:
        "Áo khoác nam vượt quá mong đợi của tôi. Vừa vặn và phong cách tuyệt vời!",
      image: "/images/avatar.png",
      productImage: "https://images.unsplash.com/photo-1551028719-00167b16eac5",
      productName: "Áo khoác nam",
      productSize: "XL",
      productColor: "Đen",
      productId: "product-2",
    },
    {
      id: 3,
      name: "Thắng Dzai",
      rating: 5,
      comment:
        "Con gái tôi rất thích chiếc ba lô mới. Nó bền và trông rất dễ thương!",
      image: "/images/avatar.png",
      productImage:
        "https://down-vn.img.susercontent.com/file/1613d45880daba79aa84d7511c5ba2c1",
      productName: "Ba lô trẻ em",
      productSize: "M",
      productColor: "Xanh",
      productId: "product-3",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full bg-bg-secondary py-16"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <h2 className="text-3xl font-bold text-center mb-12 text-card-highlight">
          Đánh giá của khách hàng
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {customerReviews.map((review) => (
            <motion.div
              key={review.id}
              className="bg-card-bg rounded-lg shadow-md overflow-hidden flex flex-col h-full"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="p-4 flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <motion.img
                      src={review.image}
                      alt={review.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h3 className="font-semibold text-card-headline">
                        {review.name}
                      </h3>
                      <div className="flex text-illustration-highlight">
                        {[...Array(review.rating)].map((_, i) => (
                          <FaStar key={i} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-card-headline">
                      {review.productName}
                    </p>
                    <p className="text-xs text-card-paragraph">
                      Size : {review.productSize} | Màu : {review.productColor}
                    </p>
                  </div>
                </div>
                <p className="text-card-paragraph mb-4 flex-grow text-clamp-3 text-justify">
                  {review.comment}
                </p>
                <Link to={`/product/${review.productId}`} className="block">
                  <motion.img
                    src={review.productImage}
                    alt={review.productName}
                    className="w-full h-48 object-cover rounded cursor-pointer"
                  />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default CustomerReviews;
