import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Notification = ({ id, message, onClose, type = 'success', duration = 3000 }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, duration);

        return () => clearTimeout(timer);
    }, [duration]);

    const handleAnimationComplete = () => {
        if (!isVisible) {
            onClose(id);
        }
    };

    const getNotificationStyle = () => {
        switch (type) {
            case 'warning':
                return 'bg-yellow-500 border-yellow-600';
            case 'success':
                return 'bg-green-500 border-green-600';
            case 'error':
                return 'bg-red-500 border-red-600';
            default:
                return 'bg-blue-500 border-blue-600';
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{ duration: 0.3 }}
                    onAnimationComplete={handleAnimationComplete}
                    className={`fixed bottom-4 right-4 ${getNotificationStyle()} text-white px-4 py-2 rounded-md shadow-lg z-50 border-l-4`}
                >
                    <div className="flex items-center">
                        <span className="mr-2">
                            {type === 'success' && '✅'}
                            {type === 'warning' && '⚠️'}
                            {type === 'error' && '❌'}
                        </span>
                        {message}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Notification;