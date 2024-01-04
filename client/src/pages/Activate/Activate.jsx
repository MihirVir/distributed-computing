import React, {useEffect, useState} from 'react'
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const Activate = () => {
    const [data, setData] = useState(false);
    const history = useNavigate();
    async function activateAccount() {
        const url = new URL(window.location.href);

        const params = new URLSearchParams(url.search);
        const token = params.get("token")

        const activate_account_url = `http://localhost/api/v1/user/active?token=${token}`

        try {
            const res = await axios.post(activate_account_url);
            console.log(res)

            setData(res.data)
            
            toast.success("Account successfully activated", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000
            });
            setTimeout(() => {
                history("/login")
            }, 1900);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        activateAccount();        
    }, [])
    return (
        <>
            <ToastContainer />
            {data ? (
                <>
                    <h1>Account is now activated</h1>
                </>
            ) : (
                <>
                    <h1>Activating your account</h1>
                </>
            )}
        </>
    )
}

export default Activate