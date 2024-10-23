import React from 'react';

const PageContent = ({ children }) => {
    return (
        <div className="mt-[calc(50rem+64px)]"> {/* Thêm chiều cao của header */}
            {children}
        </div>
    );
};

export default PageContent;
