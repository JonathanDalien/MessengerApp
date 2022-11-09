import React, { useRef, useEffect } from 'react'
import Moment from "react-moment"
import "moment/locale/de"
const Message = ({ msg, user1 }) => {
    const scrollRef = useRef();

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [msg]);


    return (
        <div ref={scrollRef} className={`message_wrapper ${msg.from === user1 ? "own" : ""}`}>
            <p className={msg.from === user1 ? "me" : "friend"}>
                {msg.media ? <img src={msg.media} alt={msg.text} /> : null}
                {msg.text}
                <br />
                <small>
                    <Moment fromNow>{msg.createdAt.toDate()}</Moment>
                </small>
            </p>
        </div>
    )
}

export default Message