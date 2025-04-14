import sys
from pathlib import Path

# Add project root to Python path
sys.path.append(str(Path(__file__).parent.parent.parent))
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from sqlalchemy.orm import Session
from app.controllers.Customer_service_support import CustomerServiceSupportController  # Import your controller
from app.schemas.css_message import CSSMessageCreate, CSSMessage  # Import the Pydantic models
from app.WebSocket.websocket import WebSocketConnectionManager  # WebSocket manager you defined
import json
import datetime
import uvicorn

app=FastAPI()
wbsm=WebSocketConnectionManager()
@app.websocket("/ws/{client_id}")
async def websocket_connected(websocket: WebSocket, client_id: int,db:Session):
     await wbsm.connect(websocket)
     print(f"User {client_id} connected")
     try:
        while True:
            data = await websocket.receive_text()
            try:
                data = json.loads(data)
            except:
                continue

            if data["type"] == "new_message":
                data = data["css_message"]
                now = datetime.datetime.now()
                current_time = now.strftime("%H:%M")

                # Save to database
                css_message = CSSMessageCreate(
                    css_history_id=data["css_history_id"],
                    receiver_user_id=data["receiver_user_id"],
                    sender_user_id=data["sender_user_id"],
                    text=data["text"],
                )

                css_message_db = CustomerServiceSupportController.sendMessage(
                    db=db, css_message=css_message
                )

                # Broadcast update
                css_message_response = CSSMessage(
                    css_history_id=css_message_db.css_history_id,
                    receiver_user_id=css_message_db.receiver_user_id,
                    sender_user_id=css_message_db.sender_user_id,
                    text=css_message_db.text,
                    css_message_id=css_message_db.css_message_id,
                    datetime=css_message_db.datetime,
                )
                message = {
                    "time": current_time,
                    "clientId": client_id,
                    "type": "css_message",
                    "css_message": css_message_response.model_dump_json(),
                }
                await wbsm.broadcast(json.dumps(message))

            elif data["type"] == "typing":
                # Broadcast update
                message = {
                    "time": current_time,
                    "clientId": client_id,
                    "type": "typing",
                    "isTyping": data["isTyping"],
                    "senderUserId": data["senderUserId"],
                    "receiverUserId": data["receiverUserId"],
                }
                await wbsm.broadcast(json.dumps(message))
        
     except WebSocketDisconnect:
        wbsm.disconnect(websocket)
        now2=datetime.now()

        message = {
            "time": now2.strftime("%c"),
            "clientId": client_id,
            "type": "disconnect",
            "message": "Offline",
        }
        await wbsm.broadcast(json.dumps(message))
if __name__ == "__main__":
    uvicorn.run("app.WebSocket.FASTAPI_route:app", host="192.168.168.1", port=8080)