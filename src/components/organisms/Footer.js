import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaTruck, FaExchangeAlt, FaShieldAlt, FaCreditCard } from 'react-icons/fa';

const Footer = React.memo(() => {
    return (
        <footer className="bg-bg-primary text-text-paragraph py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Đăng ký nhận tin */}
                <div className="mb-12 w-1/2 mx-auto">
                    <form className="flex">
                        <input
                            type="email"
                            placeholder="Email của bạn"
                            className="flex-grow px-4 py-2 rounded-l-md bg-bg-secondary text-form-input placeholder-form-input focus:outline-none focus:ring-2 focus:ring-btn-primary focus:border-transparent"
                        />
                        <button className="bg-btn-primary text-btn-text px-6 py-2 rounded-r-md hover:bg-illustration-highlight transition duration-300">
                            Đăng ký
                        </button>
                    </form>
                </div>

                {/* Chính sách */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    <div className="flex flex-col items-center text-center">
                        <FaTruck className="text-4xl mb-2" />
                        <h4 className="font-semibold mb-1">Miễn phí vận chuyển</h4>
                        <p className="text-sm">Cho đơn hàng trên 500k</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <FaExchangeAlt className="text-4xl mb-2" />
                        <h4 className="font-semibold mb-1">Đổi trả dễ dàng</h4>
                        <p className="text-sm">Trong vòng 7 ngày nếu có lỗi từ nhà sản xuất</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <FaShieldAlt className="text-4xl mb-2" />
                        <h4 className="font-semibold mb-1">Bảo mật thanh toán</h4>
                        <p className="text-sm">100% an toàn</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <FaCreditCard className="text-4xl mb-2" />
                        <h4 className="font-semibold mb-1">Nhiều hình thức thanh toán</h4>
                        <p className="text-sm">Thanh toán tiện lợi</p>
                    </div>
                </div>

                {/* Thông tin khác */}
                <div className="grid grid-cols-1 pt-8 border-t border-gray-700 md:grid-cols-4 gap-8">
                    <div>
                        <img src="/images/text-logo-white.png" alt="logo" onClick={() => window.location.href = '/'} className="cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out" />
                        <p className="text-sm text-center md:text-center">Sống phong cách.</p>
                    </div>
                    <div className="">
                        <h3 className="text-lg font-semibold mb-4">Về chúng tôi</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-btn-primary">Giới thiệu</a></li>
                            <li><a href="#" className="hover:text-btn-primary">Tuyển dụng</a></li>
                            <li><a href="#" className="hover:text-btn-primary">Liên hệ</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Hỗ trợ khách hàng</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-btn-primary">Hướng dẫn đặt hàng</a></li>
                            <li><a href="#" className="hover:text-btn-primary">Chính sách đổi trả</a></li>
                            <li><a href="#" className="hover:text-btn-primary">Câu hỏi thường gặp</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Liên hệ</h3>
                        <p className="mb-2">Team 7</p>
                        <p className="mb-2">Email: 1dt19042003@gmail.com</p>
                        <p className="mb-4">Số điện thoại: 0987654321</p>
                        <div className="flex space-x-4">
                            <a href="https://www.facebook.com/second.not2/" className="text-text-paragraph hover:text-btn-primary transition duration-300">
                                <FaFacebookF className="text-xl" />
                            </a>
                            <a href="#" className="text-text-paragraph hover:text-btn-primary transition duration-300">
                                <FaTwitter className="text-xl" />
                            </a>
                            <a href="#" className="text-text-paragraph hover:text-btn-primary transition duration-300">
                                <FaInstagram className="text-xl" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-12 pt-8 border-t border-text-paragraph text-center">
                    <p>&copy; 2024 Seven Boutique. All rights reserved.</p>
                    <p className="mt-2 text-sm text-gray-400">Owned by Team 7 | Created by Team 7</p>
                </div>
            </div>
        </footer>
    );
});

export default Footer;
