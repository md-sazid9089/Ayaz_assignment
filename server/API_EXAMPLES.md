# API Examples and Response Formats

This file contains real-world examples of API requests and responses.

## 1. Authentication

### Sign Up Request
```bash
curl -X POST http://localhost:3001/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securePassword123"
  }'
```

### Sign Up Response (201 Created)
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "user": {
      "id": "clr9x2q3x0000m408x7z9z9z9",
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2024-01-15T10:30:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbHI5eDJxM3gwMDAwbTQwOHg3ejl6OXo5IiwiZW1haWwiOiJqb2huQGV4YW1wbGUuY29tIiwiaWF0IjoxNzA1MzEyNjAwLCJleHAiOjE3MDU5MTc0MDB9.signature"
  }
}
```

### Sign In Request
```bash
curl -X POST http://localhost:3001/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securePassword123"
  }'
```

### Sign In Response (200 OK)
```json
{
  "success": true,
  "message": "Signed in successfully",
  "data": {
    "user": {
      "id": "clr9x2q3x0000m408x7z9z9z9",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbHI5eDJxM3gwMDAwbTQwOHg3ejl6OXo5IiwiZW1haWwiOiJqb2huQGV4YW1wbGUuY29tIiwiaWF0IjoxNzA1MzEyNjAwLCJleHAiOjE3MDU5MTc0MDB9.signature"
  }
}
```

### Sign Up Validation Error (400)
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    },
    {
      "field": "password",
      "message": "Password must be at least 6 characters"
    }
  ]
}
```

### Duplicate Email Error (400)
```json
{
  "success": false,
  "message": "Email already registered",
  "errors": [
    {
      "field": "email",
      "message": "This email is already in use"
    }
  ]
}
```

### Invalid Credentials Error (401)
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

---

## 2. Products

### Get All Products
```bash
curl -X GET http://localhost:3001/api/products \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Get All Products Response (200 OK)
```json
{
  "success": true,
  "message": "Products retrieved successfully",
  "data": [
    {
      "id": "clr9x2q3x0001m408x7z9z9z9",
      "userId": "clr9x2q3x0000m408x7z9z9z9",
      "productUrl": "https://amazon.com/dp/B08EXAMPLE1",
      "productTitle": "Wireless Bluetooth Headphones",
      "productImage": "https://images.example.com/headphones.jpg",
      "currentPrice": 79.99,
      "targetPrice": 49.99,
      "currency": "USD",
      "alertSent": false,
      "lastAlertSentAt": null,
      "createdAt": "2024-01-15T10:35:00.000Z",
      "updatedAt": "2024-01-15T10:35:00.000Z",
      "priceHistory": [
        {
          "id": "clr9x2q3x0002m408x7z9z9z9",
          "trackedProductId": "clr9x2q3x0001m408x7z9z9z9",
          "price": 79.99,
          "checkedAt": "2024-01-15T10:35:00.000Z"
        }
      ]
    },
    {
      "id": "clr9x2q3x0003m408x7z9z9z9",
      "userId": "clr9x2q3x0000m408x7z9z9z9",
      "productUrl": "https://amazon.com/dp/B08EXAMPLE2",
      "productTitle": "USB-C Cable",
      "productImage": "https://images.example.com/cable.jpg",
      "currentPrice": 12.99,
      "targetPrice": 9.99,
      "currency": "USD",
      "alertSent": true,
      "lastAlertSentAt": "2024-01-14T15:20:00.000Z",
      "createdAt": "2024-01-14T10:00:00.000Z",
      "updatedAt": "2024-01-14T15:20:00.000Z",
      "priceHistory": [
        {
          "id": "clr9x2q3x0004m408x7z9z9z9",
          "trackedProductId": "clr9x2q3x0003m408x7z9z9z9",
          "price": 9.50,
          "checkedAt": "2024-01-14T15:15:00.000Z"
        },
        {
          "id": "clr9x2q3x0005m408x7z9z9z9",
          "trackedProductId": "clr9x2q3x0003m408x7z9z9z9",
          "price": 12.99,
          "checkedAt": "2024-01-13T10:00:00.000Z"
        }
      ]
    }
  ]
}
```

### Add Product Request
```bash
curl -X POST http://localhost:3001/api/products \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "productUrl": "https://amazon.com/dp/B08EXAMPLE3",
    "targetPrice": 299.99
  }'
```

### Add Product Response (201 Created)
```json
{
  "success": true,
  "message": "Product added successfully",
  "data": {
    "id": "clr9x2q3x0006m408x7z9z9z9",
    "userId": "clr9x2q3x0000m408x7z9z9z9",
    "productUrl": "https://amazon.com/dp/B08EXAMPLE3",
    "productTitle": "4K Webcam Pro",
    "productImage": "https://images.example.com/webcam.jpg",
    "currentPrice": 399.99,
    "targetPrice": 299.99,
    "currency": "USD",
    "alertSent": false,
    "lastAlertSentAt": null,
    "createdAt": "2024-01-15T11:00:00.000Z",
    "updatedAt": "2024-01-15T11:00:00.000Z"
  }
}
```

### Add Product - Already Tracking Error (400)
```json
{
  "success": false,
  "message": "You are already tracking this product"
}
```

### Add Product - Invalid URL Error (400)
```json
{
  "success": false,
  "message": "Failed to fetch product information from the URL",
  "errors": null
}
```

### Add Product - Unauthorized (401)
```json
{
  "success": false,
  "message": "Authentication required"
}
```

### Update Product Request
```bash
curl -X PUT http://localhost:3001/api/products/clr9x2q3x0001m408x7z9z9z9 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "targetPrice": 39.99
  }'
```

### Update Product Response (200 OK)
```json
{
  "success": true,
  "message": "Product updated successfully",
  "data": {
    "id": "clr9x2q3x0001m408x7z9z9z9",
    "userId": "clr9x2q3x0000m408x7z9z9z9",
    "productUrl": "https://amazon.com/dp/B08EXAMPLE1",
    "productTitle": "Wireless Bluetooth Headphones",
    "productImage": "https://images.example.com/headphones.jpg",
    "currentPrice": 79.99,
    "targetPrice": 39.99,
    "currency": "USD",
    "alertSent": false,
    "lastAlertSentAt": null,
    "createdAt": "2024-01-15T10:35:00.000Z",
    "updatedAt": "2024-01-15T11:05:00.000Z"
  }
}
```

### Delete Product Request
```bash
curl -X DELETE http://localhost:3001/api/products/clr9x2q3x0001m408x7z9z9z9 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Delete Product Response (204 No Content)
```
[No body]
```

### Get Single Product Request
```bash
curl -X GET http://localhost:3001/api/products/clr9x2q3x0001m408x7z9z9z9 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Get Single Product Response (200 OK)
```json
{
  "success": true,
  "message": "Product retrieved successfully",
  "data": {
    "id": "clr9x2q3x0001m408x7z9z9z9",
    "userId": "clr9x2q3x0000m408x7z9z9z9",
    "productUrl": "https://amazon.com/dp/B08EXAMPLE1",
    "productTitle": "Wireless Bluetooth Headphones",
    "productImage": "https://images.example.com/headphones.jpg",
    "currentPrice": 79.99,
    "targetPrice": 39.99,
    "currency": "USD",
    "alertSent": false,
    "lastAlertSentAt": null,
    "createdAt": "2024-01-15T10:35:00.000Z",
    "updatedAt": "2024-01-15T11:05:00.000Z",
    "priceHistory": [
      {
        "id": "clr9x2q3x0002m408x7z9z9z9",
        "trackedProductId": "clr9x2q3x0001m408x7z9z9z9",
        "price": 79.99,
        "checkedAt": "2024-01-15T10:35:00.000Z"
      }
    ]
  }
}
```

### Product Not Found (404)
```json
{
  "success": false,
  "message": "Product not found"
}
```

### Access Denied (403)
```json
{
  "success": false,
  "message": "You do not have permission to access this product"
}
```

---

## 3. Price History

### Get Price History Request
```bash
curl -X GET "http://localhost:3001/api/products/clr9x2q3x0001m408x7z9z9z9/history?limit=30&skip=0" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Get Price History Response (200 OK)
```json
{
  "success": true,
  "message": "Price history retrieved successfully",
  "data": {
    "data": [
      {
        "id": "clr9x2q3x0007m408x7z9z9z9",
        "trackedProductId": "clr9x2q3x0001m408x7z9z9z9",
        "price": 79.99,
        "checkedAt": "2024-01-15T11:00:00.000Z"
      },
      {
        "id": "clr9x2q3x0008m408x7z9z9z9",
        "trackedProductId": "clr9x2q3x0001m408x7z9z9z9",
        "price": 85.99,
        "checkedAt": "2024-01-14T11:00:00.000Z"
      },
      {
        "id": "clr9x2q3x0009m408x7z9z9z9",
        "trackedProductId": "clr9x2q3x0001m408x7z9z9z9",
        "price": 89.99,
        "checkedAt": "2024-01-13T11:00:00.000Z"
      }
    ],
    "pagination": {
      "total": 30,
      "limit": 30,
      "skip": 0,
      "hasMore": false
    },
    "stats": {
      "minPrice": 79.99,
      "maxPrice": 129.99,
      "avgPrice": 95.33,
      "recordCount": 3,
      "totalRecords": 30,
      "priceChange": {
        "current": 79.99,
        "oldest": 129.99,
        "percentChange": -38.34
      }
    }
  }
}
```

---

## 4. Admin Endpoints

### Trigger Price Check Request
```bash
curl -X POST http://localhost:3001/api/admin/check-prices \
  -H "X-API-Key: YOUR_ADMIN_API_KEY" \
  -H "Content-Type: application/json"
```

### Trigger Price Check Response (200 OK)
```json
{
  "success": true,
  "message": "Price check completed",
  "data": {
    "totalChecked": 50,
    "successful": 48,
    "alertsSent": 3,
    "pricesChanged": 12,
    "errors": [
      {
        "trackedProductId": "clr9x2q3x0010m408x7z9z9z9",
        "oldPrice": 0,
        "newPrice": 0,
        "priceChanged": false,
        "alertSent": false,
        "error": "Failed to scrape price"
      }
    ]
  }
}
```

### Get Price Check Stats Request
```bash
curl -X GET http://localhost:3001/api/admin/check-prices \
  -H "X-API-Key: YOUR_ADMIN_API_KEY"
```

### Get Price Check Stats Response (200 OK)
```json
{
  "success": true,
  "message": "Price check stats retrieved",
  "data": {
    "totalTrackedProducts": 50,
    "productsWithAlerts": 8,
    "averagePriceHistoryLength": 15,
    "lastCheckTime": "2024-01-15T11:15:00.000Z"
  }
}
```

---

## 5. Health Check

### Health Check Request
```bash
curl -X GET http://localhost:3001/api/health
```

### Health Check Response (200 OK)
```json
{
  "success": true,
  "message": "Server is healthy",
  "data": {
    "status": "healthy",
    "timestamp": "2024-01-15T11:30:00.000Z",
    "database": "connected"
  }
}
```

### Health Check - Database Down (503)
```json
{
  "success": false,
  "message": "Server is not healthy",
  "data": {
    "status": "unhealthy",
    "timestamp": "2024-01-15T11:30:00.000Z",
    "database": "disconnected",
    "error": "connect ECONNREFUSED"
  }
}
```

---

## Usage Notes

1. **Authentication**: Always include `Authorization: Bearer {token}` header for protected endpoints
2. **Admin Key**: Include `X-API-Key: {admin-key}` header for admin endpoints
3. **Content-Type**: Always set `Content-Type: application/json` for POST/PUT requests
4. **Error Handling**: Check `success` field - false indicates an error
5. **Pagination**: Use `limit` and `skip` query parameters for price history
6. **Rate Limiting**: Not implemented yet, but should be added in production

---

## Testing with Postman

1. Import `http://localhost:3001/api` as base URL
2. Create environment variable: `token` with JWT value
3. Add header: `Authorization: Bearer {{token}}`
4. Use the examples above in Postman requests
