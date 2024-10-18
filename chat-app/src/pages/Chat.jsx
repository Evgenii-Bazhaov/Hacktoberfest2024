import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {endpoints } from '../services/apis';
import axios from 'axios';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import {io} from 'socket.io-client';

const Chat = () => {
    const socket = useRef();
    const host = "https://chat-application-sttt.onrender.com"
    const {user, loading} = useSelector((state) => state.profile);
    const [allUsers, setAllUsers] = useState([]);
    const [changeChat, setChangeChat] = useState(undefined);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {USER_API} = endpoints;
    console.log("user is: ",user);
    useEffect(() => {
        if(user){
            const getAllUsers = async () =>{
                const data = await axios.get(`${USER_API}/${user._id}`);
                console.log(data);
                setAllUsers(data.data.users);
            }
            getAllUsers();
        }
    },[user])
    useEffect(() => {
        if(user){
            socket.current = io(host);
            socket.current.emit("add-user", user._id); // when user is logged it, it's id is passed to the global map
        }
    }, [user])
    const handleChatChange = (chat) => {
        setChangeChat(chat);
    }
  return (
    <div>
        <div className='flex w-11/12 mx-auto mb-10'>
            <div className='w-1/4 bg-richblack-600 h-screen'>
                <Contacts contacts={allUsers} user={user} handleChatChange={handleChatChange}/>
            </div>
            <div className='w-3/4 bg-richblack-800 h-screen'>
                {loading &&
                    changeChat === undefined ? <Welcome user={user}/> : <ChatContainer changeChat={changeChat} user={user} socket={socket}/>
                }
                
            </div>
        </div>
    </div>
  )
}

export default Chat