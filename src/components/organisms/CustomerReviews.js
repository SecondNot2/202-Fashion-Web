import React from 'react';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';

const CustomerReviews = () => {
    const customerReviews = [
        { id: 1, name: "Anh Thắng", rating: 5, comment: "Tôi hoàn toàn yêu thích chất lượng của quần áo! Chiếc váy mùa hè tôi mua thật hoàn hảo cho mùa này.", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e", productImage: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446" },
        { id: 2, name: "CALL ME 202", rating: 4, comment: "Áo khoác nam vượt quá mong đợi của tôi. Vừa vặn và phong cách tuyệt vời!", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e", productImage: "https://images.unsplash.com/photo-1551028719-00167b16eac5" },
        { id: 3, name: "Thắng Dzai", rating: 5, comment: "Con gái tôi rất thích chiếc ba lô mới. Nó bền và trông rất dễ thương!", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e", productImage: "https://down-vn.img.susercontent.com/file/1613d45880daba79aa84d7511c5ba2c1" },
    ];

    return (
        <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto px-4 py-16"
        >
            <h2 className="text-3xl font-bold text-center mb-12">Đánh giá của khách hàng</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {customerReviews.map((review, index) => (
                    <motion.div
                        key={review.id}
                        className="bg-white rounded-lg shadow-md overflow-hidden"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                    >
                        <div className="p-4">
                            <div className="flex items-center mb-4">
                                <motion.img
                                    src={review.image}
                                    alt={review.name}
                                    className="w-12 h-12 rounded-full mr-4"
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.3 }}
                                />
                                <div>
                                    <h3 className="font-semibold">{review.name}</h3>
                                    <div className="flex text-yellow-400">
                                        {[...Array(review.rating)].map((_, i) => (
                                            <FaStar key={i} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-600 mb-4">{review.comment}</p>
                            <motion.img
                                src={review.productImage}
                                alt="Sản phẩm"
                                className="w-full h-48 object-cover rounded"
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
};

export default CustomerReviews;