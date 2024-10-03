import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = React.memo(() => {
    return (
        <footer className="bg-gray-800 text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Liên hệ chúng tôi</h3>
                        <p>12 - Lạng Sơn</p>
                        <p>Email: 1dt19042003@gmail.com</p>
                        <p>Số điện thoại: 0987654321</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Liên kết nhanh</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-blue-400">Chính sách bảo mật</a></li>
                            <li><a href="#" className="hover:text-blue-400">Điều khoản sử dụng</a></li>
                            <li><a href="#" className="hover:text-blue-400">Câu hỏi thường gặp</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Bản tin</h3>
                        <p className="mb-4">Đăng ký nhận bản tin của chúng tôi để cập nhật thông tin mới nhất và các ưu đãi.</p>
                        <form className="flex">
                            <input
                                type="email"
                                placeholder="Email của bạn"
                                className="flex-grow px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                            />
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition duration-300">
                                Đăng ký
                            </button>
                        </form>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
                    <div className="text-center md:text-left">
                        <p>&copy; 2024 Fashion 202. All rights reserved.</p>
                        <p className="mt-2 text-sm text-gray-400">Owned by 202 | Created by 202</p>
                    </div>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <a href="https://www.facebook.com/second.not2/" className="text-gray-400 hover:text-white"><FaFacebookF /></a>
                        <a href="#" className="text-gray-400 hover:text-white"><FaTwitter /></a>
                        <a href="#" className="text-gray-400 hover:text-white"><FaInstagram /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
});

export default Footer;