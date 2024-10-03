import React, { createContext, useState, useContext } from 'react';
import Notification from '../components/molecules/Notification';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    const showNotification = (message, type = 'success', duration = 3000) => {
        const id = Date.now();
        setNotifications(prev => [...prev, { id, message, type, duration }]);
    };

    const hideNotification = (id) => {
        setNotifications(prev => prev.filter(notification => notification.id !== id));
    };

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}
            {notifications.map(notification => (
                <Notification
                    key={notification.id}
                    {...notification}
                    onClose={() => hideNotification(notification.id)}
                />
            ))}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => useContext(NotificationContext);