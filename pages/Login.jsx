import React, { useState } from 'react'
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth, db } from '../src/firebase';
import { doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { TabTitle } from '../src/utils/GeneralFunctions';

const Login = () => {
    TabTitle("Login")

    const [data, setData] = useState({
        email: "",
        password: "",
        error: null,
        loading: false
    });

    const navigate = useNavigate();

    const { email, password, error, loading } = data;

    const onChangeHanlder = (e) => {
        const { name, value } = e.target;
        setData(prevData => {
            return { ...prevData, [name]: value }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setData({ ...data, error: null, loading: true })
        if (!email || !password) {
            setData({ ...data, error: "Bitte fülle alle Felder aus" })
        }
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);

            await updateDoc(doc(db, "users", result.user.uid), {
                isOnline: true,
            });
            setData({ email: "", password: "", error: null, loading: false })
            navigate("/")
        } catch (error) {
            setData({ ...data, error: error.message, loading: false })
        }
    };

    return (
        <div className='form_container'>
            <h3>Melde dich an</h3>
            <form className='form' onSubmit={handleSubmit}>
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
                        {loading ? "Bitte Warten" : "Anmelden"}
                    </button>
                </div>
            </form>
        </div>

    )
}

export default Login