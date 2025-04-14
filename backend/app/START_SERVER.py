import uvicorn
uvicorn.run("app.WebSocket.FASTAPI_route:app", host="192.168.168.1", port=8080)