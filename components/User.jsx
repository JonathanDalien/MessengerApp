import React from 'react'
import IMG from "../src/Portrait_Placeholder.png"

const User = ({ user, selectUser }) => {
    return (
        <div onClick={() => selectUser(user)} className='user_wrapper'>
            <div className="user_info">
                <div className="user_detail">
                    <img alt='avatar' src={user.avatar || IMG} className="avatar" />
                    <h4>{user.name}</h4>
                </div>
                <div className={`user_status ${user.isOnline ? "online" : "offline"}`}></div>
            </div>
        </div>
    )
}

export default User