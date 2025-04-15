from sqlalchemy.orm import Session
from fastapi import WebSocket, WebSocketDisconnect
from typing import List
from datetime import datetime
import json


class WebSocketConnectionManager:
    """Manages WebSocket connections for broadcasting and messaging."""

    def __init__(self):
        """Initialize the WebSocketConnectionManager with an empty list of active connections."""
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        """Accept and register a new WebSocket connection.

        Args:
            websocket (WebSocket): The WebSocket connection to accept.
        """
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        """Remove a WebSocket connection from the active connections list.

        Args:
            websocket (WebSocket): The WebSocket connection to remove.
        """
        self.active_connections.remove(websocket)

    async def send_personal_message(self, message: str, websocket: WebSocket):
        """Send a personal message to a specific WebSocket connection.

        Args:
            message (str): The message to send.
            websocket (WebSocket): The WebSocket connection to send the message to.
        """
        await websocket.send_text(message)

    async def broadcast(self, message: str):
        """Broadcast a message to all active WebSocket connections.

        Args:
            message (str): The message to broadcast.
        """
        for connection in self.active_connections:
            await connection.send_text(message)


# The function below is commented out and not used in this module.
# It is left here for reference and should be moved to the route code if needed.
"""Handles business logic for WebSocket communication, including message processing and broadcasting.
async def business_logic(
    web_socket_manager: WebSocketConnectionManager,
    websocket: WebSocket,
    client_id: int,
    db: Session,
):
    try:
        while True:
            data = await websocket.receive_text()
            try:
                data = json.loads(data)
            except:
                continue

            if data["type"] == "new_message":
                data = data["css_message"]
                now = datetime.now()
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
                await web_socket_manager.broadcast(json.dumps(message))

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
                await web_socket_manager.broadcast(json.dumps(message))

    except WebSocketDisconnect:
        web_socket_manager.disconnect(websocket)
        message = {
            "time": current_time,
            "clientId": client_id,
            "type": "disconnect",
            "message": "Offline",
        }
        await web_socket_manager.broadcast(json.dumps(message))
"""
