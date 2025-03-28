from minio import Minio
import uuid
import os
import base64
import io
from datetime import datetime
from typing import Optional


class ObjectStorage:
    _instance: Optional["ObjectStorage"] = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(ObjectStorage, cls).__new__(cls)
            cls._instance._initialized = False
        return cls._instance

    def __init__(self):
        if not self._initialized:
            self.client = Minio(
                endpoint="localhost:9000",
                access_key="tanknam",
                secret_key="12345678",
                secure=False,
            )
            self._initialized = True
            self._ensure_buckets_exist()

    def _ensure_buckets_exist(self):
        """Ensure required buckets exist in Minio"""
        required_buckets = ["profile-photo", "review-attachment", "dish"]

        for bucket in required_buckets:
            if not self.client.bucket_exists(bucket):
                self.client.make_bucket(bucket)

    def upload_profile_photo(self, email_address: str, encoded_image: str) -> str:
        """Upload profile photo to Minio and return URL"""
        try:
            header, encoded = encoded_image.split(",", 1)
            decoded_data = base64.b64decode(encoded)

            # Generate unique ID to avoid overwriting previous photos
            unique_id = str(uuid.uuid4())[:8]
            obj_name = f"{email_address.replace('@', '_')}_{unique_id}_profile-photo"

            self.client.put_object(
                "profile-photo",
                obj_name,
                io.BytesIO(decoded_data),
                length=len(decoded_data),
                content_type="image/jpeg",
                part_size=10 * 1024 * 1024,
            )

            return f"http://localhost:9000/profile-photo/{obj_name}"
        except Exception as e:
            # Log the error
            print(f"Error uploading profile photo: {str(e)}")
            raise e

    def upload_review_photo(
        self, consumer_id: int, stall_id: int, encoded_image: str
    ) -> str:
        """Upload review photo to Minio and return URL"""
        try:
            header, encoded = encoded_image.split(",", 1)
            decoded_data = base64.b64decode(encoded)

            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            obj_name = f"{consumer_id}_to_{stall_id}_{timestamp}_review"

            self.client.put_object(
                "review-attachment",
                obj_name,
                io.BytesIO(decoded_data),
                length=len(decoded_data),
                content_type="image/jpeg",
                part_size=10 * 1024 * 1024,
            )

            return f"http://localhost:9000/review-attachment/{obj_name}"
        except Exception as e:
            # Log the error
            print(f"Error uploading review photo: {str(e)}")
            raise e

    def upload_dish_photo(
        self, stall_id: int, dish_name: str, encoded_image: str
    ) -> str:
        """Upload dish photo to Minio and return URL"""
        try:
            header, encoded = encoded_image.split(",", 1)
            decoded_data = base64.b64decode(encoded)

            # Create sanitized object name
            sanitized_dish_name = dish_name.replace(" ", "_").lower()
            unique_id = str(uuid.uuid4())[:8]
            obj_name = f"stall_{stall_id}_{sanitized_dish_name}_{unique_id}"

            self.client.put_object(
                "dish",
                obj_name,
                io.BytesIO(decoded_data),
                length=len(decoded_data),
                content_type="image/jpeg",
                part_size=10 * 1024 * 1024,
            )

            return f"http://localhost:9000/dish/{obj_name}"
        except Exception as e:
            # Log the error
            print(f"Error uploading dish photo: {str(e)}")
            raise e
