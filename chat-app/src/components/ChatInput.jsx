import React, { useState } from 'react'
import EmojiPicker from 'emoji-picker-react';
import {IoMdSend} from 'react-icons/io';
import {BsEmojiSmileFill} from 'react-icons/bs';

const ChatInput = ({handleSendMsg}) => {
    const [msg, setMsg] = useState("");

    const sendChat = (e) =>{
        e.preventDefault();
        if(msg.length > 0){
            handleSendMsg(msg);
            setMsg('');
        }
    }

  return (
    <div className='my-3'>
        <form onSubmit={(e) => sendChat(e)} className='w-11/12 mx-auto'>
            <div className='bg-white w-full py-1 px-2 rounded-lg flex justify-between'>
                <input
                    type='text'
                    placeholder='Type your message here'
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    className='w-full mx-auto'
                />
                <button><IoMdSend/></button>
            </div>
        </form>
    </div>
  )
}

export default ChatInput