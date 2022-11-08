import React, { useState, useEffect } from 'react'
import Camera from '../components/svg/camera'
import Delete from "../components/svg/Delete"
import IMG from "../src/Portrait_Placeholder.png"
import { storage, db, auth } from '../src/firebase'
import { ref, getDownloadURL, uploadBytes, deleteObject } from 'firebase/storage'
import { getDoc, doc, updateDoc } from 'firebase/firestore'

const Profile = () => {
    const [img, setImg] = useState("");
    const [user, setUser] = useState();

    useEffect(() => {
        /* User Daten laden und User setten */
        getDoc(doc(db, "users", auth.currentUser.uid)).then(docSnap => {
            if (docSnap.exists) {
                setUser(docSnap.data());
            }
        });

        /* Falls ein Bild hochgeladen wurde, erstelle zuerst eine Image Reference. 
        Wenn User bereits ein Bild besitzt, lösche dies zuerst.
        Bild wird hochgeladen & Pfad und url werden als vars gespeichert.
        User wird geupdated und bekommt die Bildurl und den Pfad.
        */
        if (img) {
            const uploadImg = async () => {
                const imgRef = ref(storage, `avatar/${new Date().getTime()} - ${img.name}`);
                try {
                    if (user.avatarPath) {
                        await deleteObject(ref(storage, user.avatarPath))
                    }
                    const snap = await uploadBytes(imgRef, img);
                    const url = await getDownloadURL(ref(storage, snap.ref.fullPath))
                    await updateDoc(doc(db, "users", auth.currentUser.uid), {
                        avatar: url,
                        avatarPath: snap.ref.fullPath,
                    });
                    setImg("")
                } catch (error) {
                    console.log(error.message)
                }

            }
            uploadImg();
        }
    }, [img])

    /* Bild wird gelöscht die mit dem avatarPath des users übereinstimmt. User wird geupdated */

    const deleteImage = async () => {
        try {
            const confirm = window.confirm("Bild löschen?")
            if (confirm) {
                await deleteObject(ref(storage, user.avatarPath))
                await updateDoc(doc(db, "users", auth.currentUser.uid), {
                    avatar: "",
                    avatarPath: "",
                })
                window.location.reload();
            }
        } catch (error) {

        }
    }

    return (user &&
        <div className='form_container'>
            <div className="profile_container">
                <div className="img_container">
                    <img src={user.avatar || IMG} alt="avatar" />
                    <div className="overlay">
                        <div>
                            <label htmlFor='photo'>
                                <Camera />
                            </label>
                            {user.avatar ? <Delete deleteImage={deleteImage} /> : null}
                            <input type="file" name="photo" id="photo" accept='image/*' style={{ display: "none" }} onChange={e => setImg(e.target.files[0])} />
                        </div>
                    </div>
                </div>
                <div className="text_container">
                    <h3>{user?.name}</h3>
                    <p>{user?.email}</p>
                    <hr />
                    <small>Beigetreten am: {user.createdAt.toDate().toDateString()}</small>
                </div>
            </div>
        </div>
    )
}

export default Profile