from pydantic import BaseModel
class CSSMessageCreate(BaseModel):
     css_history_id: int
     receiver_user_id: int
     sender_user_id: int
     text: str
class CSSMessage(BaseModel):
      css_history_id: int
      receiver_user_id: int
      sender_user_id: int
      text: str
      css_message_id: int
      datetime: str