import websockets as wbs
import asyncio
import json
async def client():
    uri = "ws://192.168.168.1:8080"
    async with wbs.connect(uri) as test1:
        await test1.send("Hello, Server!")
        response = await test1.recv()
        print(f"Received: {response}")

#Testing messaging the server:
async def sendmsg():
    uri = "ws://192.168.168.1:8080"
    async with wbs.connect(uri) as msg1:
          message = {
            "type": "new_message",
            "css_message": {
                "type": "new_message",
                "css_history_id": "xyz",
                "sender_user_id": "1",
                "receiver_user_id": "2",
                "text": "Message from backend",

            },
        }
    await msg1.send(message)
    print("Message sent")



#asyncio.run(client())
runchoice=1
while runchoice==1:
    asyncio.run(sendmsg())
    runchoice=int(input("1 to continue, 0 to exit:"))
print("Exiting....")
