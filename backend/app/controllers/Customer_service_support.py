import sys
from pathlib import Path

# Add project root to Python path
sys.path.append(str(Path(__file__).parent.parent.parent))
import datetime
from sqlalchemy.orm import Session
from schemas.css_message import CSSMessage, CSSMessageCreate
from models.cssmessages import CSSMessageDB
import uuid
x=datetime.datetime.now()
class CustomerServiceSupportController:
    def sendMessage(db: Session, css_message: CSSMessageCreate) -> CSSMessageDB:
        css_message_idg = str(uuid.uuid4())
        db_message = CSSMessage(
            css_history_id=css_message.css_history_id,
            sender_user_id=css_message.sender_user_id,
            receiver_user_id=css_message.receiver_user_id,
            text=css_message.text,
            css_message_id=css_message_idg,
            datetime=x.strftime("%c")
        )
        
        db.add(db_message)
        db.commit()
        db.refresh(db_message)
        return db_message