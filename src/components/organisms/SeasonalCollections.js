import React from 'react';
import { motion } from 'framer-motion';
import LazyImage from '../atoms/LazyImage';

const SeasonalCollections = () => {
    const seasonalCollections = [
        { id: 1, name: "Mùa xuân", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d", description: "Cập nhật thời trang với bộ sưu tập mùa xuân của chúng tôi." },
        { id: 2, name: "Mùa hè", image: "https://images.unsplash.com/photo-1523359346063-d879354c0ea5", description: "Chuẩn bị cho mùa hè với những phong cách mùa hè đầy sắc màu." },
        { id: 3, name: "Mùa thu", image: "https://dongphucphuongthao.vn/wp-content/uploads/2022/08/trang-phuc-mua-thu-3.jpeg", description: "Mùa thu là mùa mà các nàng phải có cho mình những bộ trang phục thời thượng..." },
        { id: 4, name: "Mùa đông", image: "https://images.unsplash.com/photo-1511401139252-f158d3209c17", description: "Cảm thấy thoải mái và trang nhã với bộ sưu tập mùa đông của chúng tôi." },
    ];

    return (
        <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-bg-secondary py-16"
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <h2 className="text-3xl font-bold text-center mb-12 text-card-highlight">Bộ sưu tập theo mùa</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {seasonalCollections.map((collection, index) => (
                        <motion.div
                            key={collection.id}
                            className="bg-card-bg rounded-lg shadow-md overflow-hidden"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className="h-56 overflow-hidden">
                                <motion.div>
                                    <LazyImage
                                        src={collection.image}
                                        alt={collection.name}
                                        className="w-full h-56 object-cover"
                                        wrapperClassName="w-full h-full"
                                    />
                                </motion.div>
                            </div>
                            <div className="p-4">
                                <h3 className="text-xl font-semibold mb-2 text-card-headline">{collection.name}</h3>
                                <p className="text-card-paragraph mb-4 line-clamp-2">{collection.description}</p>
                                <motion.button
                                    className="w-full bg-btn-primary text-btn-text py-2 rounded-md hover:bg-blue-700 transition duration-300"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Xem bộ sưu tập
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
};

export default SeasonalCollections;
