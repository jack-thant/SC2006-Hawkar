from minio import Minio
import uuid
import os
import base64
import io
from datetime import datetime

class ImageUploadController:
    #----------Business Logic---------#
    # MinIO client setup
    def __init__(self):
        self.client = Minio(
            endpoint="localhost:9000",        
            access_key="hawkar1",     
            secret_key="password1",     
            secure=False                       
        )

    # Ignore this, I was just testing the minio functions.
    def uploadtest(self):
        file_path = r"C:\Users\caojm\Desktop\MinIO\miniotest.jpg"
        with open(file_path, "rb") as file_data:
            self.client.put_object(
                "test1", 
                "miniotest", 
                file_data, 
                length=os.path.getsize(file_path),  # Get actual file size
                content_type="image/jpeg",
                part_size=10 * 1024 * 1024
            )
        print("Upload Success")

    # Ignore this too, testing base64 decoding
    def uploadtest2(self):
        file_name = "image,........"  # the base64 encoded data.
        header, encoded = file_name.split(",", 1)
        file_data = base64.b64decode(encoded)
        self.client.put_object(
            "test", 
            "miniotest2", 
            io.BytesIO(file_data), 
            length=len(file_data),
            content_type="image/jpeg",  
            part_size=10 * 1024 * 1024
        )
        print("Upload Success")

    # For profile pictures
    def imageuploadpfp(self, emailaddress: str, encoded_image: str):
        header, encoded = encoded_image.split(",", 1)
        decoded_data = base64.b64decode(encoded)
        obj_name = f"{emailaddress}_pfp"
        self.client.put_object(
            "pfp", 
            obj_name, 
            io.BytesIO(decoded_data), 
            length=len(decoded_data),
            content_type="image/jpeg",  
            part_size=10 * 1024 * 1024
        )
        imageurl = r"http://localhost:9000/pfp/" + obj_name
        return imageurl

    # For comment reviews
    def imageuploadreview(self, consumer_id: int, stall_id: int, encoded_image: str):
        header, encoded = encoded_image.split(",", 1)
        decoded_data = base64.b64decode(encoded)
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        obj_name = f"{consumer_id}_to_{stall_id}_{timestamp}_review"
        self.client.put_object(
            "reviewattachment", 
            obj_name, 
            io.BytesIO(decoded_data), 
            length=len(decoded_data),
            content_type="image/jpeg",  
            part_size=10 * 1024 * 1024
        )
        imageurl = r"http://localhost:9000/reviewattachment/" + obj_name
        return imageurl
       


   






