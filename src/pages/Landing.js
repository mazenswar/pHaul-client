import React, { useContext, useState } from 'react'
import pHaulAPI from '../api/pHaulAPI';
import { Context as MainContext } from '../context/mainContext';
export default function Landing({setLogged}) {
    const {setUser} = useContext(MainContext)
    const [email,setEmail] = useState('');
    function handleChange({target}) {
        setEmail(target.value);
    }
    async function handleClick(type) {
        const endpoint = type === 'login' ? '/login' : '/users';
        try {
            const {data} = await pHaulAPI.post(endpoint, { email })
            setUser(data)
        }
        catch(e) {
            console.log(e);
        }
        localStorage.setItem('email', email)
        setLogged(true)
    }
    return (
        <div className="landing">
            <h3>Please Enter Your Email to Begin</h3>
            <input type="text" value={email} onChange={handleChange}/>
            <button onClick={()=>handleClick('login')}>Login</button>
            <button onClick={()=>handleClick('signup')}>Sign Up</button>
        </div>
    )
}
