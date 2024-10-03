import React from 'react';
import { motion } from 'framer-motion';

const FashionBlog = () => {
    const blogPosts = [
        { id: 1, title: "Trend mùa hè 2024", excerpt: "Khám phá xu hướng thời trang nổi bật của giới trẻ cho mùa hè này...", image: "https://images.unsplash.com/photo-1523359346063-d879354c0ea5", date: "15/06/2024" },
        { id: 2, title: "Cách kết hợp quần áo cho mùa thu", excerpt: "Chuẩn bị cho mùa thu với những ý tưởng kết hợp thời trang đẹp mắt...", image: "https://images.unsplash.com/photo-1511401139252-f158d3209c17", date: "28/05/2024" },
        { id: 3, title: "Thời trang thân thiện với môi trường", excerpt: "Học cách xây dựng một thời trang thân thiện với môi trường mà không làm giảm đi sự đẹp mắt...", image: "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd", date: "10/05/2024" },
    ];

    return (
        <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto px-4 py-16"
        >
            <h2 className="text-3xl font-bold text-center mb-12">Bài viết thời trang</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {blogPosts.map((post, index) => (
                    <motion.div
                        key={post.id}
                        className="bg-white rounded-lg shadow-md overflow-hidden"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                    >
                        <motion.img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-48 object-cover"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.3 }}
                        />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                            <p className="text-gray-600 mb-4">{post.excerpt}</p>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500">{post.date}</span>
                                <motion.button
                                    className="text-blue-600 hover:text-blue-800"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    Xem thêm
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
};

export default FashionBlog;