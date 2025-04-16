import websockets as wbs
import asyncio
import json
async def client():
    uri = "ws://localhost:8080/ws/test123"
    async with wbs.connect(uri) as test1:
        await test1.send("Hello, Server!")
        response = await test1.recv()
        print(f"Received: {response}")

#Testing messaging the server:
async def sendmsg():
    uri = "ws://localhost:8080/ws/test1232"
    async with wbs.connect(uri) as msg1:
        message = {
            "type": "new_message",
            "css_message": {
                "css_history_id": "xyz",
                "sender_user_id": "1",
                "receiver_user_id": "2",
                "text": "Message from backend",

            },
        }
        await msg1.send(json.dumps(message))
        print("First Message sent")
        runchoice=1
        while runchoice==1:
            await asyncio.sleep(5)  # Adjust the interval as needed
            message = {
                "type": "new_message",
                "css_message": {
                    "css_history_id": "xyz",
                    "sender_user_id": "1",
                    "receiver_user_id": "2",
                    "text": "Another message from backend",
                },
            }
            await msg1.send(json.dumps(message))
            print("Another message sent")
            runchoice=int(input("1 to continue, 0 to exit"))
        print("disconnecting...")



#asyncio.run(client())
asyncio.run(sendmsg())
print("Exiting....")
