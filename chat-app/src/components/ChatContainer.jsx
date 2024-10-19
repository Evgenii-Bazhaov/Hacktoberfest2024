import React, { useEffect, useRef, useState } from 'react'
import ChatInput from './ChatInput'
import { useDispatch } from 'react-redux'
import { addMessage } from '../services/messageApi'
import { endpoints } from '../services/apis'
import axios from 'axios'

const ChatContainer = ({changeChat, user, socket}) => {
    
    const dispatch = useDispatch();
    const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const { GET_ALL_MSG_API} = endpoints;
    const scrollRef = useRef();
    
    useEffect(() => {
        const fetchData = async () => {
            if(changeChat){
                try{
                    const response = await axios.post(GET_ALL_MSG_API, {
                        from: user._id,
                        to: changeChat._id
                    });
                    console.log("response: ", response);
                    setMessages(response.data.projectMessages);
                }
                catch(error){
                    console.log("Error while fetching messages", error);
                }
            }
        }
        fetchData();
    }, [changeChat])

    const handleSendMsg = async (msg) => {
        dispatch(addMessage(user._id, changeChat._id, msg));
        socket.current.emit("send-msg", {
            to: changeChat._id,
            from: user._id,
            message: msg,
        });
        const msgs = [...messages];
        msgs.push({fromSelf: true, message: msg});
        setMessages(msgs);
    }

    useEffect(() => {
        if(socket.current){
            socket.current.on("msg-receive", (msg) => {
                setArrivalMessage({fromSelf: false, message: msg});
            })
        }
    },[])

    useEffect(() => {
        arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behaviour: "smooth"}) 
    },[messages])

  return (
    <div className='flex flex-col h-full overflow-auto'>
        {
            changeChat && (
                <>
                <div className='py-2 bg-puregreys-700'>
                    <div className='flex gap-2'>
                        <div className='w-10 h-10 m-2 aspect-square rounded-full'>
                        <img className='rounded-full' src={`https://api.dicebear.com/5.x/initials/svg?seed=${changeChat.firstName} ${changeChat.lastName}`}/>
                        </div>
                        <p className='flex place-items-center text-white'>{changeChat.firstName} {changeChat.lastName}</p>
                    </div>
                </div>
                <div className='overflow-y-scroll'>
                    {
                        messages.map((message) => {
                            return (
                                <div ref={scrollRef}>
                                    <div>
                                        <div>
                                            <p className={`px-2 w-max mx-auto py-1 my-2 rounded-lg text-white ${message.fromSelf ? "bg-pink-700 text-right mr-2" : "bg-brown-700 text-left ml-2"}`}>{message.message}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <ChatInput handleSendMsg = {handleSendMsg}/>
                </>
            )
        }
        
    </div>
  )
}

export default ChatContainer