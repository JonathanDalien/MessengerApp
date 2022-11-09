import React, { useEffect, useState } from 'react'
import { db, auth, storage } from '../src/firebase'
import { collection, query, where, onSnapshot, addDoc, Timestamp, orderBy } from 'firebase/firestore'
import User from '../components/User'
import MessagesForm from '../components/MessagesForm'
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage'
import Message from '../components/Message'
const Home = () => {

    const [users, setUsers] = useState([]);
    const [chat, setChat] = useState("");
    const [text, setText] = useState("")
    const [img, setImg] = useState("");
    const [msgs, setMsgs] = useState([]);

    const user1 = auth.currentUser.uid

    useEffect(() => {
        const usersRef = collection(db, "users");
        /* Folgende Abfrage gibt alle user zurück, abgesehen den gerade eingeloggten User */
        const q = query(usersRef, where("uid", "not-in", [user1]))

        /* Abfrage wird durchgeführt */

        const unsub = onSnapshot(q, querySnapshot => {
            let users = []
            querySnapshot.forEach(doc => {
                users.push(doc.data())
            })
            setUsers(users)
        })
        return () => unsub();
    }, [])

    const selectUser = (user) => {
        setChat(user)

        const user2 = user.uid
        const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`

        const msgRef = collection(db, "messages", id, "chat");
        const q = query(msgRef, orderBy("createdAt", "asc"))

        onSnapshot(q, (querySnapshot) => {
            let msgs = [];
            querySnapshot.forEach(doc => {
                msgs.push(doc.data())
            })
            setMsgs(msgs)
        })
        console.log(msgs)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user2 = chat.uid

        let url;
        if (img) {
            const imgRef = ref(storage, `images/${new Date()} - ${img.name}`);
            const snap = await uploadBytes(imgRef, img)
            const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath))
            url = dlUrl;
        }

        const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`

        await addDoc(collection(db, "messages", id, "chat"), {
            text,
            from: user1,
            to: user2,
            createdAt: Timestamp.fromDate(new Date()),
            media: url || ""
        })
        setText("")
    }

    return (
        <div className='home_container'>
            <div className="users_container">
                {users.map(user => <User key={user.uid} user={user} selectUser={selectUser} />)}
            </div>
            <div className="messages_container">
                {chat ?
                    <>
                        <div className='messages_user'>
                            <h3>{chat.name}</h3>
                        </div>
                        <div className="messages">
                            {msgs.length ? msgs.map((msg, i) => <Message key={i} msg={msg} user1={user1} />) : null}
                        </div>
                        <MessagesForm handleSubmit={handleSubmit} text={text} setText={setText} setImg={setImg} />
                    </> :
                    <h3 className='no_conv'>Wähle einen User um eine Konversation zu starten</h3>}
            </div>
        </div>
    )
}

export default Home