import axios from 'axios'
import { useContext, useState } from "react"
import { UserContext } from "../../UserContext";

export default function RegisterAndLoginForm() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [isLoginOrRegister, setIsLoginOrRegister] = useState('Register')

    // eslint-disable-next-line no-undef
    const {setUsername:setLoggedInUsername, setId} = useContext(UserContext);

    async function handleSubmit(event) {
        event.preventDefault();
        const url = isLoginOrRegister === 'Register' ? 'register' : 'login';
       const {data} = await axios.post(url, { username, password });
       
       setLoggedInUsername(username);
       setId(data.id);

    }

    return (
        <>
            <div className="bg-gray-50 h-screen flex items-center">
                <form className="w-64 mx-auto mb-12" onSubmit={handleSubmit}>

                    <input value={username} onChange={event => setUsername(event.target.value)} type="text" placeholder="Username" className="block w-full rounded-md p-2 mb-2 border" />

                    <input value={password} onChange={event => setPassword(event.target.value)} type="password" placeholder="Password" className="block w-full rounded-md p-2 mb-2 border" />

                    <button type="submit" className="bg-blue-500 text-white p-2 block w-full rounded-md ">{isLoginOrRegister === 'Register' ? 'Register' : 'Sign In'}</button>
                    <div className="mt-5 text-center">
                        {isLoginOrRegister === 'Register' && (
                            <div>
                            Already a member?
                              <button onClick={()=> setIsLoginOrRegister('login')} className='text-blue-600 ml-2'>Sign In Now</button>
                            </div>
                        )}

                        {isLoginOrRegister === 'login' && (
                            <div>
                            Dont have an account?
                              <button onClick={()=> setIsLoginOrRegister('Register')} className='text-blue-600 ml-2'>Register</button>
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </> 
    )
}