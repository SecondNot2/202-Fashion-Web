import React, { useState, useEffect, useRef } from "react";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { Search } from "lucide-react";
import useCart from '../../hooks/useCart';
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
    const [isSticky, setIsSticky] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchSuggestions, setSearchSuggestions] = useState([]);
    const { cartItems } = useCart();
    const [activeCategory, setActiveCategory] = useState(null);
    const timeoutRef = useRef(null);
    const [isFocused, setIsFocused] = useState(false);
    const [hoveredCategory, setHoveredCategory] = useState(null);

    const categories = [
        { name: "Trang chủ", link: "/" },
        { name: "Nam", subcategories: ["Áo", "Quần", "Giày"] },
        { name: "Nữ", subcategories: ["Váy", "Áo", "Phụ kiện"] },
        { name: "Phụ kiện", subcategories: ["Túi xách", "Mũ", "Kính mát"] },
        { name: "Giảm giá", subcategories: ["Mùa hè", "Clearance", "Flash Sale"] }
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 0);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (searchQuery.length > 2) {
            const suggestions = ["Dress", "Jeans", "T-shirt", "Jacket"].filter(item =>
                item.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setSearchSuggestions(suggestions);
        } else {
            setSearchSuggestions([]);
        }
    }, [searchQuery]);

    const handleCategoryHover = (index) => {
        clearTimeout(timeoutRef.current);
        setActiveCategory(index);
    };

    const handleCategoryLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setActiveCategory(null);
        }, 300);
    };

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={`w-full bg-white transition-all duration-300 ${isSticky ? "fixed top-0 left-0 shadow-md" : "relative"} z-50 border-b-2 border-blue-200`}
        >
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <motion.div
                        className="flex-shrink-0"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <img
                            src="/images/logo.gif"
                            alt="Fashion Logo"
                            className="h-10 w-auto"
                        />
                    </motion.div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-6">
                        {categories.map((category, index) => (
                            <motion.div
                                key={index}
                                className="relative group"
                                onMouseEnter={() => {
                                    handleCategoryHover(index);
                                    setHoveredCategory(index);
                                }}
                                onMouseLeave={() => {
                                    handleCategoryLeave();
                                    setHoveredCategory(null);
                                }}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                                {category.link ? (
                                    <motion.a
                                        href={category.link}
                                        className={`flex items-center text-gray-700 hover:text-theme-color-primary focus:outline-none relative ${hoveredCategory === index ? 'text-blue-500' : ''}`}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {category.name}
                                        <motion.div
                                            className="absolute -bottom-0.5 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full"
                                            initial={{ width: 0 }}
                                            animate={{ width: hoveredCategory === index ? '100%' : 0 }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </motion.a>
                                ) : (
                                    <motion.button
                                        className={`flex items-center text-gray-700 hover:text-theme-color-primary focus:outline-none relative ${hoveredCategory === index ? 'text-blue-500' : ''}`}
                                        aria-haspopup="true"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {category.name}
                                        <motion.div
                                            animate={{ rotate: activeCategory === index ? 180 : 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <IoMdArrowDropdown className="ml-1" />
                                        </motion.div>
                                        <motion.div
                                            className="absolute -bottom-0.5 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full"
                                            initial={{ width: 0 }}
                                            animate={{ width: hoveredCategory === index ? '100%' : 0 }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </motion.button>
                                )}
                                <AnimatePresence>
                                    {activeCategory === index && category.subcategories && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                                        >
                                            <div className="py-1" role="menu" aria-orientation="vertical">
                                                {category.subcategories.map((subcategory, subIndex) => (
                                                    <motion.a
                                                        key={subIndex}
                                                        href="#"
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                        role="menuitem"
                                                        whileHover={{ backgroundColor: "#f3f4f6", x: 5 }}
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ duration: 0.2, delay: subIndex * 0.05 }}
                                                    >
                                                        {subcategory}
                                                    </motion.a>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </nav>

                    {/* Search Bar */}
                    <div className="hidden md:block relative w-full max-w-sm">
                        <div
                            className={`relative flex items-center transition-all duration-300 ease-in-out`}
                        >
                            <input
                                type="text"
                                placeholder="Tìm kiếm sản phẩm..."
                                className="w-full h-11 py-3 pl-12 pr-20 text-gray-700 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-transparent rounded-full outline-none transition-all duration-300 ease-in-out focus:border-blue-400 focus:from-white focus:to-white"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                            />
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <Search
                                    className={`h-6 w-6 transition-all duration-300 ease-in-out ${isFocused
                                        ? "text-blue-500 scale-110 rotate-12"
                                        : "text-gray-400"
                                        }`}
                                />
                            </div>
                            <button
                                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-400 to-indigo-500 text-white px-2 py-2 rounded-full transition-all duration-300 ease-in-out hover:from-blue-500 hover:to-indigo-600 hover:shadow-lg active:scale-95"
                            >
                                Tìm kiếm
                            </button>
                            <div
                                className={`absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-500 transition-all duration-300 ease-in-out rounded-full ${isFocused ? "w-full" : "w-0"
                                    }`}
                            ></div>
                        </div>
                        {searchSuggestions.length > 0 && (
                            <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg">
                                {searchSuggestions.map((suggestion, index) => (
                                    <div
                                        key={index}
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    >
                                        {suggestion}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* User Account and Cart */}
                    <div className="flex items-center space-x-4">
                        <motion.button
                            className="text-gray-700 hover:text-theme-color-primary focus:outline-none"
                            aria-label="Tài khoản người dùng"
                            whileHover={{ scale: 1.1, color: '#3B82F6' }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <FaUser className="text-xl" />
                        </motion.button>
                        <motion.button
                            className="relative text-gray-700 hover:text-theme-color-primary focus:outline-none"
                            aria-label="Giỏ hàng"
                            whileHover={{ scale: 1.1, color: '#3B82F6' }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <FaShoppingCart className="text-xl" />
                            {cartItems > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-2 -right-2 bg-theme-color-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-blue-600"
                                >
                                    {cartItems}
                                </motion.span>
                            )}
                        </motion.button>
                    </div>

                    {/* Mobile Menu Button */}
                    <motion.button
                        className="md:hidden text-gray-700 hover:text-theme-color-primary focus:outline-none"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Mở/đóng menu di động"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <GiHamburgerMenu className="text-2xl" />
                    </motion.button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden mt-4"
                        >
                            <nav className="flex flex-col space-y-2">
                                {categories.map((category, index) => (
                                    <motion.a
                                        key={index}
                                        href={category.link || "#"}
                                        className="text-left text-gray-700 hover:text-theme-color-primary focus:outline-none"
                                        whileHover={{ x: 5 }}
                                    >
                                        {category.name}
                                    </motion.a>
                                ))}
                            </nav>
                            <motion.div
                                className="mt-4"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm sản phẩm"
                                    className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-theme-color-primary"
                                    aria-label="Tìm kiếm sản phẩm"
                                />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.header>
    );
};

export default Header;