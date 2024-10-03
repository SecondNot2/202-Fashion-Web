import React, { useState } from 'react';
import { IoMdChatbubbles } from 'react-icons/io';

const LiveChat = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);

    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <button
                onClick={toggleChat}
                className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
            >
                <IoMdChatbubbles className="text-2xl" />
            </button>
            {isChatOpen && (
                <div className="absolute bottom-16 right-0 w-80 bg-white rounded-lg shadow-xl">
                    <div className="p-4 border-b">
                        <h3 className="text-lg font-semibold">Trò chuyện trực tuyến</h3>
                    </div>
                    <div className="p-4 h-64 overflow-y-auto">
                        {/* Chat messages would go here */}
                        <p className="text-gray-600">Chào mừng đến với cửa hàng của chúng tôi! Chúng tôi có thể giúp gì cho bạn?</p>
                    </div>
                    <div className="p-4 border-t">
                        <input
                            type="text"
                            placeholder="Nhập tin nhắn của bạn..."
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default LiveChat;