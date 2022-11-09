import React from 'react'
import Upload from './svg/Upload'

const MessagesForm = ({ handleSubmit, text, setText, setImg }) => {
    return (
        <form className='message_form' onSubmit={handleSubmit}>
            <label htmlFor='img'><Upload /></label>
            <input onChange={e => setImg(e.target.files[0])} type="file" name="img" id="img" accept='image/*' style={{ display: "none" }} />
            <div>
                <input type="text" placeholder='Gebe eine Nachricht ein' value={text} onChange={e => setText(e.target.value)} />
            </div>
            <div>
                <button className='btn'>Senden</button>
            </div>
        </form>
    )
}

export default MessagesForm