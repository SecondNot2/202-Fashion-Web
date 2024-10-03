import { useState, useEffect } from 'react';

const useCart = () => {
    const [cartItems, setCartItems] = useState(() => {
        const savedCartItems = localStorage.getItem('cartItems');
        return savedCartItems ? parseInt(savedCartItems, 10) : 0;
    });

    useEffect(() => {
        localStorage.setItem('cartItems', cartItems.toString());
    }, [cartItems]);

    const addToCart = () => {
        setCartItems(prevItems => prevItems + 1);
    };

    return { cartItems, addToCart };
};

export default useCart;