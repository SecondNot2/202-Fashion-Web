import React, { useState, useEffect, useRef, useMemo } from "react";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { Search } from "lucide-react";
import useCart from '../../hooks/useCart';
import { motion, AnimatePresence, color } from "framer-motion";

const Header = ({ isTransparent }) => {
    const [isSticky, setIsSticky] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchSuggestions, setSearchSuggestions] = useState([]);
    const { cartItems } = useCart();
    const [activeCategory, setActiveCategory] = useState(null);
    const timeoutRef = useRef(null);
    const [isFocused, setIsFocused] = useState(false);
    const [hoveredCategory, setHoveredCategory] = useState(null);
    const [isCartHovered, setIsCartHovered] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [allProducts, setAllProducts] = useState([]);

    const categories = [
        { name: "Trang chủ", link: "/" },
        { name: "Nam", subcategories: ["Áo", "Quần", "Giày"] },
        { name: "Nữ", subcategories: ["Váy", "Áo", "Phụ kiện"] },
        { name: "Phụ kiện", subcategories: ["Túi xách", "Mũ", "Kính mát"] },
        { name: "Giảm giá", subcategories: ["Mùa hè", "Clearance", "Flash Sale"] }
    ];

    const sampleProducts = useMemo(() => [
        { id: 1, name: "Áo sơ mi", category: "Áo" },
        { id: 2, name: "Quần jean", category: "Quần" },
        { id: 3, name: "Váy hoa", category: "Váy" },
        { id: 4, name: "Giày thể thao", category: "Giày" },
    ], []);

    useEffect(() => {
        setAllProducts(sampleProducts);
    }, [sampleProducts]);

    useEffect(() => {
        const handleScroll = () => {
            const position = window.pageYOffset;
            setScrollPosition(position);
            setIsSticky(position > 0);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (searchQuery.length > 2) {
            const suggestions = allProducts
                .filter(product =>
                    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    product.category.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map(product => product.name)
                .slice(0, 5); // Giới hạn số lượng gợi ý
            setSearchSuggestions(suggestions);
        } else {
            setSearchSuggestions([]);
        }
    }, [searchQuery, allProducts]);

    const handleCategoryHover = (index) => {
        clearTimeout(timeoutRef.current);
        setActiveCategory(index);
    };

    const handleCategoryLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setActiveCategory(null);
        }, 300);
    };

    // Xác định màu nền dựa trên prop isTransparent và cuộn
    const headerBackground = isTransparent
        ? scrollPosition > 0
            ? "bg-bg-primary shadow-md"
            : "bg-transparent"
        : "bg-bg-primary shadow-md";

    // Xác định màu chữ dựa trên prop isTransparent và cuộn
    const textColor = isTransparent && scrollPosition === 0 ? "text-text-headline" : "text-text-headline";

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={`w-full transition-all duration-300 fixed top-0 left-0 z-50 ${headerBackground}`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between py-4">
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
                                        className={`flex items-center ${textColor} hover:text-btn-primary focus:outline-none relative ${hoveredCategory === index ? 'text-btn-primary' : ''
                                            }`}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {category.name}
                                        <motion.div
                                            className="absolute -bottom-0.5 left-0 h-0.5 bg-btn-primary rounded-full"
                                            initial={{ width: 0 }}
                                            animate={{ width: hoveredCategory === index ? '100%' : 0 }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </motion.a>
                                ) : (
                                    <motion.button
                                        className={`flex items-center ${textColor} hover:text-btn-primary focus:outline-none relative ${hoveredCategory === index ? 'text-btn-primary' : ''
                                            }`}
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
                                            className="absolute -bottom-0.5 left-0 h-0.5 bg-gradient-to-r from-btn-primary to-illustration-highlight rounded-full"
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
                                            <div className="border-b border-illustration-stroke" role="menu" aria-orientation="vertical">
                                                {category.subcategories.map((subcategory, subIndex) => (
                                                    <motion.a
                                                        key={subIndex}
                                                        href="#"
                                                        className="block px-4 py-2 text-sm text-card-paragraph2 hover:bg-gray-100 hover: rounded-md"
                                                        role="menuitem"
                                                        whileHover={{ backgroundColor: "#f9bc60" }}
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
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

                    {/* Logo */}
                    <motion.div
                        className="flex-shrink-0"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <img
                            src={isTransparent && scrollPosition === 0 ? "/images/text-logo-white.png" : "/images/text-logo-white.png"}
                            onClick={() => window.location.href = '/'}
                            alt="Logo thời trang"
                            className="h-16 w-auto cursor-pointer"
                        />
                    </motion.div>

                    {/* Search Bar */}
                    <div className="hidden md:block relative w-xs max-w-xs">
                        <div
                            className={`relative flex items-center transition-all duration-300 ease-in-out`}
                        >
                            <input
                                type="text"
                                placeholder="Tìm kiếm sản phẩm..."
                                className="w-full h-10 py-3 pl-12 pr-20 text-gray-700 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-transparent rounded-full outline-none transition-all duration-300 ease-in-out focus:border-illustration-highlight focus:from-white focus:to-white"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                            />
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <Search
                                    className={`h-6 w-6 transition-all duration-300 ease-in-out ${isFocused
                                        ? "text-illustration-highlight scale-110 rotate-12"
                                        : "text-gray-400"
                                        }`}
                                />
                            </div>
                            <motion.button
                                className="absolute right-0 bg-gradient-to-r from-btn-primary to-illustration-highlight text-btn-text px-2 py-2 rounded-full transition-all duration-300 ease-in-out"
                                whileHover={{
                                    backgroundImage: 'linear-gradient(to right, #f9bc60, #e16162)',
                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                                }}
                            >
                                Tìm kiếm
                            </motion.button>
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
                            className={`${textColor} hover:text-btn-primary focus:outline-none`}
                            aria-label="Tài khoản người dùng"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <FaUser className="text-xl" />
                        </motion.button>
                        <motion.div
                            className="relative"
                            onMouseEnter={() => setIsCartHovered(true)}
                            onMouseLeave={() => setIsCartHovered(false)}
                        >
                            <motion.button
                                className={`relative ${textColor} hover:text-btn-primary focus:outline-none`}
                                aria-label="Giỏ hàng"
                                whileHover={{ scale: 1.1, color: '#f9bc60' }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <FaShoppingCart className="text-xl mt-2" />
                                {cartItems.length > 0 && (
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="absolute -top-2 -right-2 bg-illustration-highlight text-btn-text rounded-full w-5 h-5 flex items-center justify-center text-xs  hover:text-btn-primary"
                                    >
                                        {cartItems.length}
                                    </motion.span>
                                )}
                            </motion.button>

                            <AnimatePresence>
                                {isCartHovered && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl z-50"
                                    >
                                        <div className="p-4">
                                            <h3 className="text-lg font-semibold mb-2">Giỏ hàng của bạn</h3>
                                            {!cartItems || (Array.isArray(cartItems) && cartItems.length === 0) ? (
                                                <p className="text-gray-500">Giỏ hàng trống</p>
                                            ) : (
                                                <>
                                                    <ul className="space-y-2">
                                                        {Array.isArray(cartItems) ? (
                                                            cartItems.slice(0, 3).map((item, index) => (
                                                                <li key={index} className="flex items-center justify-between">
                                                                    <span className="text-sm">{item.name}</span>
                                                                    <span className="text-sm font-semibold">{item.price}</span>
                                                                </li>
                                                            ))
                                                        ) : (
                                                            <li className="flex items-center justify-between">
                                                                <span className="text-sm">{cartItems.name}</span>
                                                                <span className="text-sm font-semibold">{cartItems.price}</span>
                                                            </li>
                                                        )}
                                                    </ul>
                                                    {Array.isArray(cartItems) && cartItems.length > 3 && (
                                                        <p className="text-sm text-gray-500 mt-2">
                                                            ...và {cartItems.length - 3} sản phẩm khác
                                                        </p>
                                                    )}
                                                    <motion.button
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        className="mt-4 w-full bg-btn-primary text-btn-text py-2 rounded-md hover:bg-illustration-highlight transition duration-300"
                                                    >
                                                        Xem giỏ hàng
                                                    </motion.button>
                                                </>
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>

                    {/* Mobile Menu Button */}
                    <motion.button
                        className={`md:hidden ${textColor} hover:text-btn-primary focus:outline-none`}
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
