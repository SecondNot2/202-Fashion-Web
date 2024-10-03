# Cấu Trúc Cơ Sở Dữ Liệu Realtime Database cho Website Thời Trang

## 1. Cấu Trúc Dữ Liệu

### 1.1. Users
- Mục đích: Quản lý thông tin người dùng
- Cấu trúc:
  ```json
  "Users": {
    "$uid": {
      "name": "string",
      "email": "string",
      "password": "string (đã mã hóa)",
      "address": {
        "street": "string",
        "city": "string",
        "state": "string",
        "zip": "string"
      },
      "createdAt": "timestamp",
      "role": "string"
    }
  }
  ```

### 1.2. Products
- Mục đích: Quản lý thông tin sản phẩm
- Cấu trúc:
  ```json
  "Products": {
    "$productId": {
      "name": "string",
      "description": "string",
      "price": "number",
      "categoryId": "string",
      "images": ["string"],
      "stock": "number",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    }
  }
  ```

### 1.3. Categories
- Mục đích: Phân loại sản phẩm
- Cấu trúc:
  ```json
  "Categories": {
    "$categoryId": {
      "name": "string",
      "description": "string",
      "createdAt": "timestamp"
    }
  }
  ```

### 1.4. Orders
- Mục đích: Quản lý đơn đặt hàng
- Cấu trúc:
  ```json
  "Orders": {
    "$orderId": {
      "userId": "string",
      "products": {
        "$productId": {
          "quantity": "number",
          "price": "number"
        }
      },
      "totalAmount": "number",
      "status": "string",
      "shippingAddress": {
        "street": "string",
        "city": "string",
        "state": "string",
        "zip": "string"
      },
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    }
  }
  ```

### 1.5. Cart
- Mục đích: Lưu trữ giỏ hàng tạm thời
- Cấu trúc:
  ```json
  "Cart": {
    "$userId": {
      "items": {
        "$productId": {
          "quantity": "number"
        }
      },
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    }
  }
  ```

### 1.6. Reviews
- Mục đích: Lưu trữ đánh giá sản phẩm
- Cấu trúc:
  ```json
  "Reviews": {
    "$reviewId": {
      "productId": "string",
      "userId": "string",
      "rating": "number",
      "comment": "string",
      "createdAt": "timestamp"
    }
  }
  ```

## 2. Quy Tắc Bảo Mật

Đây là quy tắc bảo mật cơ bản cho Realtime Database:

```json
{
  "rules": {
    ".read": false,
    ".write": false,
    "Users": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid"
      }
    },
    "Products": {
      ".read": true,
      ".write": "auth != null && root.child('Users').child(auth.uid).child('role').val() === 'admin'"
    },
    "Categories": {
      ".read": true,
      ".write": "auth != null && root.child('Users').child(auth.uid).child('role').val() === 'admin'"
    },
    "Reviews": {
      ".read": true,
      ".write": "auth != null"
    },
    "Orders": {
      "$orderId": {
        ".read": "auth != null && data.child('userId').val() === auth.uid",
        ".write": "auth != null && (!data.exists() || data.child('userId').val() === auth.uid)"
      }
    },
    "Cart": {
      "$userId": {
        ".read": "$userId === auth.uid",
        ".write": "$userId === auth.uid"
      }
    }
  }
}
```

## 3. Hướng Dẫn Sử Dụng

1. Khởi tạo Realtime Database trong dự án React.
2. Sử dụng các hàm CRUD (Create, Read, Update, Delete) để tương tác với dữ liệu.
3. Áp dụng quy tắc bảo mật để đảm bảo an toàn cho dữ liệu.
4. Tối ưu hóa truy vấn để cải thiện hiệu suất.

## 4. Lưu Ý

- Đảm bảo mã hóa thông tin nhạy cảm như mật khẩu trước khi lưu vào cơ sở dữ liệu.
- Sử dụng indexing cho các truy vấn phức tạp để tăng tốc độ truy xuất.
- Cập nhật quy tắc bảo mật khi có thay đổi trong cấu trúc dữ liệu hoặc logic ứng dụng.
- Lưu ý rằng Realtime Database sử dụng cấu trúc dữ liệu dạng cây, khác với cấu trúc collection-document của Firestore.