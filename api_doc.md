# Hawkar API Documentation

This document outlines the request and response formats for the Hawkar application API.

## Table of Contents

- [Stalls](#stalls)
  - [`fetchStalls` - GET](#fetchstalls---get)
  - [`AddStall` - POST](#addstall---post)
  - [`EditStall` - PUT](#editstall---put)
  - [`DeleteStall` - DELETE](#deletestall---delete)
- [Dishes](#dishes)
  - [`fetchDishesByStallID` - GET](#fetchdishesbystallid---get)
  - [`AddDish` - POST](#adddish---post)
  - [`EditDish` - PUT](#editdish---put)
  - [`DeleteDish` - DELETE](#deletedish---delete)
- [Reviews](#reviews)
  - [`fetchReviewByStallID` - GET](#fetchreviewbystallid---get)
  - [`fetchReportedReview` - GET](#fetchreportedreview---get)
  - [`AddReview` - POST](#addreview---post)
  - [`EditReview` - PUT](#editreview---put)
  - [`DeleteReview` - DELETE](#deletereview---delete)
  - [`ReportReview` - POST](#reportreview---post)
  - [`IgnoreReportedReview` - POST](#ignorereportedreview---post)
- [Hawker Centres](#hawker-centres)
  - [`fetchHawkerCentreByStallID` - GET](#fetchhawkercentrebystallid---get)
  - [`fetchHawkerCentre` - GET](#fetchhawkercentre---get)
- [Hawker Management](#hawker-management)
  - [`ApproveHawker` - POST](#approvehawker---post)
- [Likes](#likes)
  - [`LikeStall` - POST](#likestall---post)
  - [`UnlikeStall` - DELETE](#unlikestall---delete)
  - [`FetchLikedStallByUserID` - GET](#fetchlikedstallsbyuserid---get)

---

## Stalls

### `fetchStalls` - GET ✅

Retrieves a list of all stalls or filtered by parameters.

**Endpoint:** `/stalls`

**Response format:**

```json
[
  {
    "stallID": 1,
    "stallName": "string",
    "hawkerID": 5,
    "hawker": {
      "hawkerID": 5,
      "address": "Nanyang Technological University",
      "license": "123456789",
      "verifyStatus": true,
      "userID": 5,
      "user": {
        "name": "Alex",
        "emailAddress": "hawker1@gmail.com",
        "userID": 5,
        "profilePhoto": "http://minio:9000/profile-photo/user10_example.com_15dc5a24_profile-photo",
        "contactNumber": "95874723",
        "role": "Hawker"
      }
    },
    "hawkerCenterID": 1,
    "hawkerCenter": {
      "hawkerCenterID": 1,
      "name": "NTU",
      "address": "Nanyang Technological University",
      "latitude": 1.35397,
      "longitude": 103.68779
    },
    "images": [
      "http://minio:9000/profile-photo/user_example.com_55d0ae45_profile-photo",
      "http://minio:9000/profile-photo/user10_example.com_15dc5a24_profile-photo"
    ],
    "unitNumber": "01-01",
    "startTime": "10:00:00",
    "endTime": "20:00:00",
    "hygieneRating": "A",
    "cuisineType": [
      "Chinese",
      "Indian"
    ],
    "estimatedWaitTime": 0,
    "priceRange": "string"
  },
  {
    "stallID": 2,
    "stallName": "Korean BBQ Store",
    "hawkerID": 5,
    "hawker": {
      "hawkerID": 5,
      "address": "Nanyang Technological University",
      "license": "123456789",
      "verifyStatus": true,
      "userID": 5,
      "user": {
        "name": "Alex",
        "emailAddress": "hawker1@gmail.com",
        "userID": 5,
        "profilePhoto": "http://minio:9000/profile-photo/user10_example.com_15dc5a24_profile-photo",
        "contactNumber": "95874723",
        "role": "Hawker"
      }
    },
    "hawkerCenterID": 2,
    "hawkerCenter": {
      "hawkerCenterID": 2,
      "name": "North Spine",
      "address": "Nanyang Technological University",
      "latitude": 1.35397,
      "longitude": 103.68779
    },
    "images": [
      "http://minio:9000/profile-photo/user_example.com_55d0ae45_profile-photo",
      "http://minio:9000/profile-photo/user10_example.com_15dc5a24_profile-photo"
    ],
    "unitNumber": "01-02",
    "startTime": "10:00:00",
    "endTime": "20:00:00",
    "hygieneRating": "B",
    "cuisineType": [
      "Korean"
    ],
    "estimatedWaitTime": 20,
    "priceRange": "$4 - $8"
  }
]
```

### `fetchStallByStallID` - GET ✅

Retrieves a stall or by stallID.

**Endpoint:** `/stall/{stallID}`

**Response format:**

```json
{
  "stallID": 1,
  "stallName": "string",
  "hawkerID": 5,
  "hawker": {
    "hawkerID": 5,
    "address": "Nanyang Technological University",
    "license": "123456789",
    "verifyStatus": true,
    "userID": 5,
    "user": {
      "name": "Alex",
      "emailAddress": "hawker1@gmail.com",
      "userID": 5,
      "profilePhoto": "http://minio:9000/profile-photo/user10_example.com_15dc5a24_profile-photo",
      "contactNumber": "95874723",
      "role": "Hawker"
    }
  },
  "hawkerCenterID": 1,
  "hawkerCenter": {
    "hawkerCenterID": 1,
    "name": "NTU",
    "address": "Nanyang Technological University",
    "latitude": 1.35397,
    "longitude": 103.68779
  },
  "images": [
    "http://minio:9000/profile-photo/user_example.com_55d0ae45_profile-photo",
    "http://minio:9000/profile-photo/user10_example.com_15dc5a24_profile-photo"
  ],
  "unitNumber": "01-01",
  "startTime": "10:00:00",
  "endTime": "20:00:00",
  "hygieneRating": "A",
  "cuisineType": [
    "Chinese",
    "Indian"
  ],
  "estimatedWaitTime": 0,
  "priceRange": "string"
}
```

### `AddStall` - POST pass ✅

Creates a new stall entry.

**Endpoint:** `/stall/add`

**Request format:**

```json
{
  "stallName": "New Delicious Food",
  "hawkerID": 5
  "hawkerCentreID": "1"
  "images": ["array of base64 strings"],
  "unitNumber": "02-03",
  "startTime": "09:00:00",
  "endTime": "21:00:00",
  "hygieneRating": "A",
  "cuisineType": ["Western", "Fusion"],
  "estimatedWaitTime": 0,
  "priceRange": "$6-$10",
}
```

**Response format:**

```json
{
  "success": true,
  "message": "Stall created successfully"
}
```

### `EditStall` - PUT pass ✅

Updates an existing stall's information. (All optional)

**Endpoint:** `/stall/update/{stallID}`

**Request format:**

```json
{
  "stallName": "Updated Food Stall",
  "images": ["array of base64 strings"],
  "unitNumber": "02-03",
  "startTime": "08:30",
  "endTime": "20:30",
  "hygieneRating": "A",
  "cuisineType": ["Western", "Fusion", "International"],
  "priceRange": "$7-$12"
}
```

**Response format:**

```json
{
  "success": true,
  "message": "Stall updated successfully"
}
```

### `DeleteStall` - DELETE ✅

Removes a stall from the system.

**Endpoint:** `/stall/delete/{stallID}`

**Response format:**

```json
{
  "success": true,
  "message": "Stall deleted successfully"
}
```

---

## Dishes

### `fetchDishesByStallID` - GET

Retrieves all dishes for a specific stall.

**Endpoint:** `/stalls/{stallID}/dishes`

**Response format:**

```json
{
 [
    {
      "dishID": "d123456",
      "dishName": "Chicken Rice",
      "price": 5.50,
      "photo": "http://example.com/chicken-rice.jpg",
      "onPromotion": false
    },
    {
      "dishID": "d234567",
      "dishName": "Signature Noodles",
      "price": 7.80,
      "photo": "http://example.com/noodles.jpg",
      "onPromotion": true,
      "startDate": "2025-04-01",
      "endDate": "2025-04-30",
      "discountedPrice": 6.50
    }
  ]
}
```

### `AddDish` - POST

Adds a new dish to a stall.

**Endpoint:** `/stalls/{stallID}/dishes`

**Request format:**

```json
{
  "dishName": "Seafood Fried Rice",
  "price": 8.90,
  "photo": "http://example.com/seafood-fried-rice.jpg",
  "onPromotion": false
}
```

**Alternative Request (with promotion):**

```json
{
  "dishName": "Special Laksa",
  "price": 9.90,
  "photo": "http://example.com/laksa.jpg",
  "onPromotion": true,
  "startDate": "2025-05-01",
  "endDate": "2025-05-31",
  "discountedPrice": 7.90
}
```

**Response format:**

```json
{
  "success": true,
  "message": "Dish added successfully"
}
```

### `EditDish` - PUT

Updates an existing dish.

**Endpoint:** `/dishes/{dishID}`

**Request format:**

```json
{
  "dishName": "Premium Seafood Fried Rice",
  "price": 9.90,
  "photo": "http://example.com/premium-seafood-rice.jpg",
  "onPromotion": true,
  "startDate": "2025-05-01",
  "endDate": "2025-05-31",
  "discountedPrice": 8.50
}
```

**Response format:**

```json
{
  "success": true,
  "message": "Dish updated successfully",
}
```

### `DeleteDish` - DELETE

Removes a dish from the system.

**Endpoint:** `/dishes/{dishID}`

**Response format:**

```json
{
  "success": true,
  "message": "Dish deleted successfully",
}
```

---

## Reviews

### `fetchReviewByStallID` - GET

Retrieves all reviews for a specific stall.

**Endpoint:** `/stalls/{stallID}/reviews`

**Response format:**

```json
{
    [
      {
        "reviewID": "r123456",
        "userID": "u789012",
        "rating": 4.5,
        "reviewText": "The food here is absolutely delicious and worth the wait!",
      },
      {
        "reviewID": "r234567",
        "userID": "u890123",
        "rating": 3.0,
        "comment": "Food is good but the portion is a bit small for the price.",
      }
    ]
}
```

### `fetchReportedReview` - GET

Retrieves all reviews for a specific stall.

**Endpoint:** `/admin/reported_reviews`

**Response format:**

```json
{
    [
      {
        "stallID": 1,
        "rating": 1.2,
        "isReported": true,
        "reviewText": "This is a sample review",
        "reportType": "type of report",
        "consumerID": 8,
        "reportText": "This is not okay"
      },
      {
        "stallID": 1,
        "rating": 1.2,
        "isReported": true,
        "reviewText": "This is a sample review",
        "reportType": "type of report",
        "consumerID": 8,
        "reportText": "This is not okay"
      },
    ]
}
```

### `AddReview` - POST

Adds a new review for a stall.

**Endpoint:** `/stalls/{stallID}/reviews`

**Request format:**

```json
{
  "rating": 5.0,
  "comment": "One of the best hawker stalls I've been to! The chicken rice is amazing.",
}
```

**Response format:**

```json
{
  "success": true,
  "message": "Review added successfully",
}
```

### `EditReview` - PUT

Updates an existing review.

**Endpoint:** `/reviews/{reviewID}`

**Request format:**

```json
{
  "rating": 4.5,
  "comment": "Updated: Still really good but the service was a bit slow today.",
}
```

**Response format:**

```json
{
  "success": true,
  "message": "Review updated successfully",
}
```

### `DeleteReview` - DELETE

Removes a review from the system.

**Endpoint:** `/reviews/{reviewID}`

**Response format:**

```json
{
  "success": true,
  "message": "Review deleted successfully",
}
```

### `ReportReview` - POST

Reports an inappropriate review.

**Endpoint:** `/reviews/{reviewID}/report`

**Request format:**

```json
{
  "reportType": "Inappropriate content",
  "reportText": "This review contains offensive language and is not related to the food."
}
```

**Response format:**

```json
{
  "success": true,
  "message": "Review reported successfully",
}
```

### `IgnoreReportedReview` - PUT

Marks a reported review as reviewed and ignored (not requiring action).

**Endpoint:** `/admin/reports/{reviewID}/ignore`

**Request format:**

```json
{
    "stallID": 1,
    "rating": 4.5,
    "isReported": false,
    "reviewText": "This is the sample review",
    "reportType": "",
    "reportText": "",
    "consumerID": 1
}
```

**Response format:**

```json
{
  "success": true,
  "message": "Report marked as resolved"
}
```

---

## Hawker Centres

### `fetchHawkerCentreByStallID` - GET

Retrieves hawker centre information for a specific stall.

**Endpoint:** `/stalls/{stallID}/hawker-centre`

**Response format:**

```json
{
    "name": "name of hawker centre",
    "address": "address",
    "latitude": 1.2321,
    "longitude": 1.23213
}
```

### `fetchHawkerCentre` - GET

Retrieves a list of all hawker centres or details of a specific hawker centre.

**Endpoint:** `/hawker-centres`

**Response format (list):**

```json
{
    [
      {
        "hawkerCentreID": "h789012",
        "name": "Maxwell Food Centre",
        "address": "1 Kadayanallur St, Singapore 069184",
        "latitude": 1.213,
        "longitude": 1.2131

      },
      {
        "hawkerCentreID": "h789012",
        "name": "Maxwell Food Centre",
        "address": "1 Kadayanallur St, Singapore 069184",
        "latitude": 1.213,
        "longitude": 1.2131

      },
    ],
}
```

---

## Hawker Management

### `ApproveHawker` - POST

Approves a hawker's registration application.

**Endpoint:** `/api/admin/hawkers/{hawkerID}/approve`

**Request format:**

```json
{
  "verifyStatus": true
}
```

**Response format:**

```json
{
  "success": true,
  "message": "Hawker approved successfully",
}
```

---

## Likes

### `LikeStall` - POST

Allows a user to like a stall.

**Endpoint:** `/stalls/{stallID}/like`

**Request format:**

```json
{
  "stallID": 1,
  "userID": 1
}
```

**Response format:**

```json
{
  "success": true,
  "message": "Stall liked successfully",
}
```

### `UnlikeStall` - DELETE

Allows a user to unlike a previously liked stall.

**Endpoint:** `/stalls/{stallID}/like`

**Response format:**

```json
{
  "success": true,
  "message": "Stall unliked successfully",
}
```

### `FetchLikedStallsByUserID` - GET

Get the liked stalls by the user

**Endpoint:** `/api/stalls/{user}/like`

**Response format:**

```json
{
  [
    {
        "stallID": 1
    },
    {
        "stallID": 2
    }
  ]
}
```

---
