import React from 'react';
import { useNotification } from '../contexts/NotificationContext';
import Banner from '../components/organisms/Banner';
import FeaturedProducts from '../components/organisms/FeaturedProducts';
import SaleProducts from '../components/organisms/SaleProducts';
import CustomerReviews from '../components/organisms/CustomerReviews';
import SeasonalCollections from '../components/organisms/SeasonalCollections';
import FashionBlog from '../components/organisms/FashionBlog';
import RecommendedProducts from '../components/organisms/RecommendedProducts';

const HomePage = () => {
    const { showNotification } = useNotification();

    return (
        <div className="flex flex-col min-h-screen">
            <Banner />

            {/* Loại bỏ container cho nội dung chính */}
            <FeaturedProducts showNotification={showNotification} />
            <SaleProducts showNotification={showNotification} />
            <RecommendedProducts showNotification={showNotification} />
            <SeasonalCollections />
            <FashionBlog />
            <CustomerReviews />
        </div>
    );
};

export default HomePage;
