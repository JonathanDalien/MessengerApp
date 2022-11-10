import { doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../src/firebase';
import IMG from "../src/Portrait_Placeholder.png"

const User = ({ user, selectUser, user1, chat }) => {

    const user2 = user?.uid
    const [data, setData] = useState("");

    useEffect(() => {
        const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`
        let unsub = onSnapshot(doc(db, "lastMsg", id), doc => {
            setData(doc.data())
        });
        return () => unsub()
    }, [])


    return (
        <>
            <div onClick={() => selectUser(user)} className={`user_wrapper ${chat.name === user.name && "selected_user"}`}>
                <div className="user_info">
                    <div className="user_detail">
                        <img alt='avatar' src={user.avatar || IMG} className="avatar" />
                        <h4>{user.name}</h4>
                        {data?.from !== user1 && data?.unread && <small className='unread'>New</small>}
                    </div>
                    <div className={`user_status ${user.isOnline ? "online" : "offline"}`}></div>
                </div>
                {data && (

                    <p className="truncate">
                        <strong>{data.from === user1 ? "Ich" : null}</strong>
                        {data.text}
                    </p>
                )}
            </div>
            <div onClick={() => selectUser(user)} className={`sm_container ${chat.name === user.name && "selected_user"}`}>
                <img alt='avatar' src={user.avatar || IMG} className="avatar sm_screen" />
            </div>
        </>
    )
}

export default User