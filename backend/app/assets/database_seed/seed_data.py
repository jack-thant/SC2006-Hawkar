from datetime import datetime
from schemas.user import Role

import bcrypt

salt = bcrypt.gensalt()
common_password = bcrypt.hashpw("123123123".encode("utf-8"), salt=salt)

DATABASE_SEED_DATA = {
    # ---------- Users ---------- #
    "users": [
        # ---------- Admin ---------- #
        {
            "userID": 1,
            "name": "Admin Jane",
            "emailAddress": "admin1@gmail.com",
            "password": common_password,
            "profile_picture": "[Seed]profile-girl-1.jpg",
            "role": Role.ADMIN,
        },
        {
            "userID": 12,
            "name": "Doggo",
            "emailAddress": "admin2@gmail.com",
            "password": common_password,
            "profile_picture": "[Seed]profile-dog-1.jpg",
            "role": Role.ADMIN,
        },
        # ---------- Consumer ---------- #
        {
            "userID": 2,
            "name": "Janice",
            "emailAddress": "consumer1@gmail.com",
            "password": common_password,
            "profile_picture": "[Seed]profile-girl-2.jpg",
            "role": Role.CONSUMER,
        },
        {
            "userID": 3,
            "name": "Alicia",
            "emailAddress": "consumer2@gmail.com",
            "password": common_password,
            "profile_picture": "[Seed]profile-girl-3.jpg",
            "role": Role.CONSUMER,
        },
        {
            "userID": 4,
            "name": "James",
            "emailAddress": "consumer3@gmail.com",
            "password": common_password,
            "profile_picture": "[Seed]profile-guy-3.jpg",
            "role": Role.CONSUMER,
        },
        # ---------- Hawker ---------- #
        {
            "userID": 5,
            "name": "Alex",
            "emailAddress": "hawker1@gmail.com",
            "password": common_password,
            "profile_picture": "[Seed]profile-hawker-ntu-hot-hideout.jpg",
            "role": Role.HAWKER,
        },
        {
            "userID": 6,
            "name": "Adam",
            "emailAddress": "hawker2@gmail.com",
            "password": common_password,
            "profile_picture": "[Seed]profile-hawker-ntu-north-spine.jpeg",
            "role": Role.HAWKER,
        },
        {
            "userID": 7,
            "name": "Aaron",
            "emailAddress": "hawker3@gmail.com",
            "password": common_password,
            "profile_picture": "[Seed]profile-hawker-ntu-crowded-bowl.jpeg",
            "role": Role.HAWKER,
        },
        {
            "userID": 8,
            "name": "William",
            "emailAddress": "hawker4@gmail.com",
            "password": common_password,
            "profile_picture": "[Seed]profile-hawker-chicken-rice-store.jpg",
            "role": Role.HAWKER,
        },
        {
            "userID": 9,
            "name": "Ness",
            "emailAddress": "hawker5@gmail.com",
            "password": common_password,
            "profile_picture": "[Seed]profile-hawker-noodles-store.jpg",
            "role": Role.HAWKER,
        },
    ],
    # ---------- Admin ---------- #
    "admins": [
        {
            "adminID": 1,
            "userID": 1,
        },
        {
            "adminID": 12,
            "userID": 12,
        },
    ],
    # ---------- Consumer ---------- #
    "consumers": [
        {"consumerID": 2, "userID": 2},
        {"consumerID": 3, "userID": 3},
        {"consumerID": 4, "userID": 4},
    ],
    # ---------- Hawker ---------- #
    "hawkers": [
        {
            "hawkerID": 5,
            "businessName": "A Hot Hideout (NTU)",
            "contactNumber": "95874723",
            "address": "Nanyang Technological University",
            "latitude": 1.35397,
            "longitude": 103.68779,
            "verifyStatus": True,
            "userID": 5,
        },
        {
            "hawkerID": 6,
            "businessName": "North Spine Koufu - Cai Fan Store",
            "contactNumber": "95874723",
            "address": "Nanyang Technological University",
            "latitude": 1.35397,
            "longitude": 103.68779,
            "verifyStatus": True,
            "userID": 6,
        },
        {
            "hawkerID": 7,
            "businessName": "The Crowded Bowl",
            "contactNumber": "95874723",
            "address": "Nanyang Technological University",
            "latitude": 1.35397,
            "longitude": 103.68779,
            "verifyStatus": True,
            "userID": 7,
        },
        {
            "hawkerID": 8,
            "businessName": "Chicken Rice Store (NTU)",
            "contactNumber": "95874723",
            "address": "Nanyang Technological University",
            "latitude": 1.35397,
            "longitude": 103.68779,
            "verifyStatus": True,
            "userID": 8,
        },
        {
            "hawkerID": 9,
            "businessName": "Noodles Store (NTU)",
            "contactNumber": "95874723",
            "address": "Nanyang Technological University",
            "latitude": 1.35397,
            "longitude": 103.68779,
            "verifyStatus": True,
            "userID": 9,
        },
    ],
    # ---------- Stall ---------- #
    "stalls": [
        # ----- For A Hot Hideout (hawkerID 5) ----- #
        {
            "stallID": 1,
            "stallName": "Mala Store",
            "unitNumber": "01-01",
            "openStatus": True,
            "operatingHours": "10:00-20:00",
            "hygieneRating": 4.5,
            "cuisineType": "CHINESE",
            "estimatedWaitTime": 15,
            "hawkerID": 5,
        },
        {
            "stallID": 2,
            "stallName": "Korean BBQ Store",
            "unitNumber": "01-02",
            "openStatus": True,
            "operatingHours": "10:00-20:00",
            "hygieneRating": 4.0,
            "cuisineType": "KOREAN",
            "estimatedWaitTime": 20,
            "hawkerID": 5,
        },
        # ----- For North Spine Kofu Cai Fan (stallID 6) ----- #
        {
            "stallID": 3,
            "stallName": "Cai Fan Store",
            "unitNumber": "01-03",
            "openStatus": True,
            "operatingHours": "10:00-20:00",
            "hygieneRating": 3.5,
            "cuisineType": "CHINESE",
            "estimatedWaitTime": 10,
            "hawkerID": 6,
        },
        # ----- For The Crowded Bowl (stallID 7) ----- #
        {
            "stallID": 4,
            "stallName": "Mixed Rice Store",
            "unitNumber": "01-04",
            "openStatus": True,
            "operatingHours": "10:00-20:00",
            "hygieneRating": 4.0,
            "cuisineType": "CHINESE",
            "estimatedWaitTime": 10,
            "hawkerID": 7,
        },
        # ----- For Chicken Rice Store (stallID 8) ----- #
        {
            "stallID": 5,
            "stallName": "Chicken Rice Store",
            "unitNumber": "01-05",
            "openStatus": True,
            "operatingHours": "10:00-20:00",
            "hygieneRating": 4.5,
            "cuisineType": "CHINESE",
            "estimatedWaitTime": 10,
            "hawkerID": 8,
        },
        # ----- For Noodles Store (stallID 9) ----- #
        {
            "stallID": 6,
            "stallName": "Noodles Store",
            "unitNumber": "01-06",
            "openStatus": True,
            "operatingHours": "10:00-20:00",
            "hygieneRating": 4.0,
            "cuisineType": "CHINESE",
            "estimatedWaitTime": 10,
            "hawkerID": 9,
        },
    ],
    # ---------- Review ---------- #
    "reviews": [
        # ----- For A Hot Hideout (hawkerID 5) ----- #
        {
            "reviewID": 1,
            "reviewText": "Hot and spicy! It is very delicious!! 😋",
            "rating": 5.0,
            "consumerID": 2,
            "stallID": 1,
        },
        {
            "reviewID": 2,
            "reviewText": "Nice and cosy environment to eat mala with friends >.<",
            "rating": 5.0,
            "consumerID": 3,
            "stallID": 1,
        },
        {
            "reviewID": 3,
            "reviewText": "Hate it! It was too spicy and it made me sweat in front of my interviewer 😠😠",
            "rating": 0.0,
            "consumerID": 4,
            "stallID": 2,
        },
        # ----- For North Spine Kofu Cai Fan (stallID 6) ----- #
        {
            "reviewID": 4,
            "reviewText": "Big portion. But on a more pricy side.",
            "rating": 3.8,
            "consumerID": 4,
            "stallID": 3,
        },
        # ----- For The Crowded Bowl (stallID 7) ----- #
        {
            "reviewID": 5,
            "reviewText": "Cheap!",
            "rating": 5.0,
            "consumerID": 3,
            "stallID": 4,
        },
        # ----- For Chicken Rice Store (stallID 8) ----- #
        {
            "reviewID": 6,
            "reviewText": "Chicken is very tender! Highly recommended",
            "rating": 5.0,
            "consumerID": 2,
            "stallID": 5,
        },
        {
            "reviewID": 7,
            "reviewText": "🤮🤮🤮🤮",
            "rating": 1.5,
            "consumerID": 4,
            "stallID": 6,
        },
    ],
    # ---------- Dish ---------- #
    "dishes": [
        # ----- For A Hot Hideout (hawkerID 5) ----- #
        {
            "dishID": 1,
            "stallID": 1,
            "dishName": "Mala Xiang Guo",
            "price": 6.0,
            "photo": "[Seed]mala-xiang-guo.jpg",
        },
        {
            "dishID": 2,
            "stallID": 2,
            "dishName": "Korean BBQ Set",
            "price": 10.0,
            "photo": "[Seed]korea BBQ set.jpg",
        },
        # ----- For North Spine Kofu Cai Fan (stallID 6) ----- #
        {
            "dishID": 3,
            "stallID": 3,
            "dishName": "Cai Fan",
            "price": 4.0,
            "photo": "[Seed]cai-fan.jpg",
        },
        # ----- For The Crowded Bowl (stallID 7) ----- #
        {
            "dishID": 4,
            "stallID": 4,
            "dishName": "Mixed Rice",
            "price": 4.0,
            "photo": "[Seed]mixed-rice.jpg",
        },
        # ----- For Chicken Rice Store (stallID 8) ----- #
        {
            "dishID": 5,
            "stallID": 5,
            "dishName": "Chicken Rice",
            "price": 3.5,
            "photo": "[Seed]chicken-rice.jpg",
        },
        # ----- For Noodles Store (stallID 9) ----- #
        {
            "dishID": 6,
            "stallID": 6,
            "dishName": "Noodles",
            "price": 3.0,
            "photo": "[Seed]noodles.jpg",
        },
    ],
    # ---------- Promotion ---------- #
    "promotions": [
        {
            "promotionID": 1,
            "dishID": 1,
            "startDate": datetime(2021, 1, 1),
            "endDate": datetime(2021, 12, 31),
            "discountedPrice": 5.0,
        },
        {
            "promotionID": 2,
            "dishID": 2,
            "startDate": datetime(2021, 1, 1),
            "endDate": datetime(2021, 12, 31),
            "discountedPrice": 3.0,
        },
        {
            "promotionID": 3,
            "dishID": 3,
            "startDate": datetime(2021, 1, 1),
            "endDate": datetime(2021, 12, 31),
            "discountedPrice": 3.0,
        },
        {
            "promotionID": 4,
            "dishID": 4,
            "startDate": datetime(2021, 1, 1),
            "endDate": datetime(2021, 12, 31),
            "discountedPrice": 3.0,
        },
        {
            "promotionID": 5,
            "dishID": 5,
            "startDate": datetime(2021, 1, 1),
            "endDate": datetime(2021, 12, 31),
            "discountedPrice": 2.5,
        },
    ],
}
