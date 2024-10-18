import React, { useEffect, useState } from 'react'

const Contacts = ({contacts,user,handleChatChange}) => {
    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);

    useEffect(() => {
        if(user){
            setCurrentUserName(user.firstName + " " + user.lastName);
            console.log( "user name is: ",currentUserName);
        }
    },[user])
    const changeCurrentChat = (index,contact) => {
        setCurrentSelected(index);
        handleChatChange(contact);
        console.log("hello")

    }
  return (
    <div>
        {
            currentUserName && (
                <div className='flex h-max flex-col gap-10 justify-between overflow-hidden'>
                    <div className='text-center text-white font-bold text-3xl py-2'>Chat application</div>
                    <div className='flex flex-col items-center overflow-auto gap-3'>
                        {
                            contacts.map((contact,index) => (
                                <div className={`text-white py-2 px-1 w-10/12 flex rounded-lg ${index === currentSelected ? "bg-richblue-900" : "bg-richblue-400"}`} onClick={() => changeCurrentChat(index,contact)}>
                                    <div className='flex gap-2'>
                                        <img className='rounded-full w-10 h-10 m-2 aspect-square ' src={`https://api.dicebear.com/5.x/initials/svg?seed=${contact.firstName} ${contact.lastName}`}/>
                                        <p className='flex place-items-center'>{contact.firstName} {contact.lastName}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className='flex items-center justify-center gap-2 place-items-end'>
                        <img className='w-10 h-10 m-2 aspect-square rounded-full' src={`https://api.dicebear.com/5.x/initials/svg?seed=${user.firstName} ${user.lastName}`}/>
                        <p className='flex place-items-center'>{user.firstName} {user.lastName}</p>
                    </div>
                    
                </div>

            )
            
        }
    </div>
  )
}

export default Contacts