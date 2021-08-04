import React, { useContext, useState } from 'react'
import pHaulAPI from '../api/pHaulAPI';
import { Context as MainContext } from '../context/mainContext';
export default function Landing({setLogged}) {
    const {setUser} = useContext(MainContext)
    const [email,setEmail] = useState('');
    const [error, setError] = useState(null);
    function handleChange({target}) {
        setEmail(target.value);
    }
    async function handleClick(type) {
        const validInput = email.includes('@') && email.length;
        if (!validInput) return setError('Please enter a valid email')
        setError(null)
        const endpoint = type === 'login' ? '/login' : '/users';
        try {
            const {data} = await pHaulAPI.post(endpoint, { email })
            setUser(data)
            localStorage.setItem('email', email)
            setLogged(true)
        }
        catch(e) {
            setError('Could not find user with that email');
        }
    }
    return (
        <div className="landing">
            <span className="error">{error}</span>
            <h3>Please Enter Your Email to Begin</h3>
            <input type="email" value={email} onChange={handleChange}/>
            <button onClick={()=>handleClick('login')}>Login</button>
            <button onClick={()=>handleClick('signup')}>Sign Up</button>
        </div>
    )
}
