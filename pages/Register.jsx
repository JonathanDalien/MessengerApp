import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth, db } from '../src/firebase';
import { doc, setDoc } from "firebase/firestore";
import { Timestamp } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";

const Register = () => {

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        error: null,
        loading: false
    });

    const navigate = useNavigate();

    const { name, email, password, error, loading } = data;

    const onChangeHanlder = (e) => {
        const { name, value } = e.target;
        setData(prevData => {
            return { ...prevData, [name]: value }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setData({ ...data, error: null, loading: true })
        if (!name || !email || !password) {
            setData({ ...data, error: "Bitte fülle alle Felder aus" })
            return;
        }
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            await setDoc(doc(db, "users", result.user.uid), {
                uid: result.user.uid,
                name,
                email,
                createdAt: Timestamp.fromDate(new Date()),
                isOnline: true,
            });
            setData({ name: "", email: "", password: "", error: null, loading: false })
            navigate("/")
        } catch (error) {
            setData({ ...data, error: error.message, loading: false })
        }
    };

    return (
        <div className='form_container'>
            <h3>Account erstellen</h3>
            <form className='form' onSubmit={handleSubmit}>
                <div className="input_container">
                    <label htmlFor="name">Name</label>
                    <input value={name} onChange={onChangeHanlder} type="text" name="name" />
                </div>
                <div className="input_container">
                    <label htmlFor="email">Email</label>
                    <input value={email} onChange={onChangeHanlder}
                        type="text"
                        name="email"
                    />
                </div>
                <div className="input_container">
                    <label htmlFor="password">Password</label>
                    <input value={password} onChange={onChangeHanlder}
                        type="password"
                        name="password"
                    />
                </div>
                {error ? <p className='error'>{error}</p> : null}
                <div className="btn_container">
                    <button disabled={loading} type='submit' className="btn">
                        {loading ? "Bitte Warten" : "Registrieren"}
                    </button>
                </div>
            </form>
        </div>

    )
}

export default Register