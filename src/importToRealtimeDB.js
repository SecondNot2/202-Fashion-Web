const admin = require('firebase-admin');
const serviceAccount = require('../fashion-web-1f225-firebase-adminsdk-bo384-2bffcfae59.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://fashion-web-1f225-default-rtdb.firebaseio.com"
});

const db = admin.database();

// Hàm để tạo dữ liệu mẫu cho mỗi bảng
const createSampleData = () => {
    const data = {
        Users: {
            user1: {
                uid: "user1",
                name: "Nguyễn Văn A",
                email: "nguyenvana@example.com",
                address: {
                    street: "123 Đường ABC",
                    city: "Hà Nội",
                    state: "HN",
                    zip: "100000"
                },
                createdAt: new Date().toISOString(),
                role: "customer"
            }
        },
        Products: {
            product1: {
                name: "Áo thun nam",
                description: "Áo thun nam chất lượng cao",
                price: 200000,
                categoryId: "category1",
                images: ["url1", "url2"],
                stock: 100,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }
        },
        Categories: {
            category1: {
                name: "Áo nam",
                description: "Các loại áo dành cho nam giới",
                createdAt: new Date().toISOString()
            }
        },
        Orders: {
            order1: {
                userId: "user1",
                products: {
                    product1: {
                        quantity: 2,
                        price: 200000
                    }
                },
                totalAmount: 400000,
                status: "pending",
                shippingAddress: {
                    street: "123 Đường ABC",
                    city: "Hà Nội",
                    state: "HN",
                    zip: "100000"
                },
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }
        },
        Cart: {
            user1: {
                items: {
                    product1: {
                        quantity: 1
                    }
                },
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }
        },
        Reviews: {
            review1: {
                productId: "product1",
                userId: "user1",
                rating: 5,
                comment: "Sản phẩm rất tốt",
                createdAt: new Date().toISOString()
            }
        }
    };

    return data;
};

// Hàm để import dữ liệu vào Realtime Database
const importData = async () => {
    const sampleData = createSampleData();
    const tables = Object.keys(sampleData);

    try {
        for (const table of tables) {
            await db.ref(table).set(sampleData[table]);
            console.log(`Dữ liệu bảng ${table} đã được import thành công`);
        }
        console.log("Tất cả dữ liệu đã được import thành công vào Realtime Database");
    } catch (error) {
        console.error("Lỗi khi import dữ liệu:", error);
        console.log("Đang xóa các bảng đã import thành công...");
        for (const table of tables) {
            try {
                await db.ref(table).remove();
                console.log(`Đã xóa bảng ${table}`);
            } catch (removeError) {
                console.error(`Lỗi khi xóa bảng ${table}:`, removeError);
            }
        }
    }
};

// Thực hiện import
importData().then(() => {
    process.exit(0);
});