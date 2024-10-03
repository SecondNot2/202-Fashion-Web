import React from 'react';
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';
import LiveChat from '../atoms/LiveChat';
import ScrollToTop from '../atoms/ScrollToTop';

const MainLayout = ({ children }) => {
    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
            <LiveChat />
            <ScrollToTop />
        </>
    );
};

export default MainLayout;