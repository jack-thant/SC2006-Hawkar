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

### `fetchDishesByStallID` - GET ✅

Retrieves all dishes for a specific stall.

**Endpoint:** `/stall/{stallID}/dishes`

**Response format:**

```json
[
  {
    "dishID": 1,
    "stallID": 1,
    "dishName": "Mala Xiang Guo",
    "price": 6,
    "photo": "http://minio:9000/profile-photo/user_example.com_55d0ae45_profile-photo",
    "onPromotion": true
  },
  {
    "dishID": 7,
    "stallID": 1,
    "dishName": "Noodles",
    "price": 3,
    "photo": "http://minio:9000/profile-photo/user_example.com_55d0ae45_profile-photo",
    "onPromotion": false
  }
]
```

### `AddDish` - POST ✅ (will create a promotion when onPromotion==true)

Adds a new dish to a stall.

**Endpoint:** `/stall/{stallID}/add-dish`

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

### `EditDish` - PUT ✅ (will delete the promotion when onPromotion==false)

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

### `DeleteDish` - DELETE ✅

Removes a dish from the system.

**Endpoint:** `/dish/delete/{dishID}`

**Response format:**

```json
{
  "success": true,
  "message": "Dish deleted successfully",
}
```

---

## Reviews

### `fetchReviewByStallID` - GET ✅

Retrieves all reviews for a specific stall.

**Endpoint:** `/stalls/{stallID}/reviews`

**Response format:**

```json
[
  [
  {
    "reviewID": 1,
    "reviewText": "Hot and spicy! It is very delicious!! 😋",
    "rating": 5,
    "isReported": false,
    "reportText": null,
    "reportType": null,
    "consumerID": 2,
    "consumer": {
      "consumerID": 2,
      "address": "Nanyang Technological University",
      "dietaryPreference": "Vegetarian",
      "preferredCuisine": "Chinese",
      "ambulatoryStatus": "Normal",
      "favoriteStalls": [
        1,
        2
      ],
      "userID": 2,
      "user": {
        "name": "Janice",
        "emailAddress": "consumer1@gmail.com",
        "userID": 2,
        "profilePhoto": "http://minio:9000/profile-photo/user_example.com_55d0ae45_profile-photo",
        "contactNumber": "95874723",
        "role": "Consumer"
      }
    },
    "stallID": 1,
    "stall": {
      "stallID": 1,
      "stallName": "Mala Store",
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
      "estimatedWaitTime": 15,
      "priceRange": "$4 - $8"
    }
  },
  {
    "reviewID": 2,
    "reviewText": "Nice and cosy environment to eat mala with friends >.<",
    "rating": 5,
    "isReported": false,
    "reportText": null,
    "reportType": null,
    "consumerID": 3,
    "consumer": {
      "consumerID": 3,
      "address": "Nanyang Technological University",
      "dietaryPreference": "Normal",
      "preferredCuisine": "Chinese",
      "ambulatoryStatus": "Normal",
      "favoriteStalls": [
        1,
        2
      ],
      "userID": 3,
      "user": {
        "name": "Alicia",
        "emailAddress": "consumer2@gmail.com",
        "userID": 3,
        "profilePhoto": "http://minio:9000/profile-photo/user10_example.com_15dc5a24_profile-photo",
        "contactNumber": "95874723",
        "role": "Consumer"
      }
    },
    "stallID": 1,
    "stall": {
      "stallID": 1,
      "stallName": "Mala Store",
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
      "estimatedWaitTime": 15,
      "priceRange": "$4 - $8"
    }
  }
]
]
```

### `fetchReportedReview` - GET ✅

Retrieves all reported reviews

**Endpoint:** `/admin/reported_reviews`

**Response format:**

```json
{
    [
      {
        "reviewID": 1,
        "reviewText": "Hot and spicy! It is very delicious!! 😋",
        "rating": 5,
        "isReported": true,
        "reportText": "This review is spam",
        "reportType": "spam",
        "consumerID": 2,
        "stallID": 1,
        ...
      }
      {
        "reviewID": 2,
        "reviewText": "Nice and cosy environment to eat mala with friends >.<",
        "rating": 5,
        "isReported": true,
        "reportText": "This review is irrelevant",
        "reportType": "irrelevant",
        "consumerID": 3,
        "stallID": 1,
        ...
      },
    ]
}
```

### `AddReview` - POST ✅

Adds a new review for a stall.

**Endpoint:** `/stalls/{stallID}/reviews`

**Request format:**

```json
{
  "reviewText": "Very Good!",
  "rating": 4.5,
  "consumerID": 2,
  "stallID": 1
}
```

**Response format:**

```json
{
  "success": true,
  "message": "Review added successfully",
}
```

### `EditReview` - PUT ✅

Updates an existing review.

**Endpoint:** `/review/update/{reviewID}`

**Request format:**

```json
{
  "reviewID": 11,
  "reviewText": "string",
  "rating": 3.0
}
```

**Response format:**

```json
{
  "success": true,
  "message": "Review updated successfully",
}
```

### `DeleteReview` - DELETE ✅

Removes a review from the system.

**Endpoint:** `/review/delete/{reviewID}`

**Response format:**

```json
{
  "success": true,
  "message": "Review deleted successfully",
}
```

### `ReportReview` - POST ✅

Reports an inappropriate review.

**Endpoint:** `/review/{reviewID}/report`

**Request format:**

```json
{
  "reviewID": 6,
  "reportType": "spam",
  "reportText": "This is spam"
}
```

**Response format:**

```json
{
  "success": true,
  "message": "Review reported successfully",
}
```

### `IgnoreReportedReview` - PUT ✅

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

### `fetchHawkerCentreByStallID` - GET ✅

Retrieves hawker centre information for a specific stall.

**Endpoint:** `/stalls/{stallID}/hawker-center`

**Response format:**

```json
{
  "hawkerCenterID": 1,
  "name": "NTU",
  "address": "Nanyang Technological University",
  "latitude": 1.35397,
  "longitude": 103.68779
}
```

### `fetchHawkerCentre` - GET ✅

Retrieves a list of all hawker centres or details of a specific hawker centre.

**Endpoint:** `/hawker-centers`

**Response format (list):**

```json
[
  {
    "hawkerCenterID": 1,
    "name": "NTU",
    "address": "Nanyang Technological University",
    "latitude": 1.35397,
    "longitude": 103.68779
  },
  {
    "hawkerCenterID": 2,
    "name": "North Spine",
    "address": "Nanyang Technological University",
    "latitude": 1.35397,
    "longitude": 103.68779
  }
]
```

---

## Hawker Management 

### `ApproveHawker` - POST ✅

Approves a hawker's registration application.

**Endpoint:** `/admin/verify-hawker/{hawkerID}`

**Request format:**

```json

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

### `LikeStall` - POST ✅

Allows a user to like a stall.

**Endpoint:** `/stall/{userID}/like/{stallID}`

**Request format:**

```json
```

**Response format:**

```json
{
  "success": true,
  "message": "Stall liked successfully",
}
```

### `UnlikeStall` - DELETE ✅

Allows a user to unlike a previously liked stall.

**Endpoint:** `/stall/{userID}/unlike/{stallID}`

**Response format:**

```json
{
  "success": true,
  "message": "Stall unliked successfully",
}
```

### `FetchLikedStallsByUserID` - GET ✅

Get the liked stalls by the user

**Endpoint:** `/stall/{userID}/liked`

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
