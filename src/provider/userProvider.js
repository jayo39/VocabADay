import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext(null);

const UserProvider = (props) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        let tmp = async() => {
            try {
                let res = await axios.get('/api/user/loggedIn', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                setUser(res.data);
            } catch(err) {
                if(err.response.data.errno === 1) {
                    localStorage.removeItem('accessToken');
                    setUser(null);
                } else if (err.response.data.errno === 2) {
                    localStorage.removeItem('accessToken');
                    setUser(null);
                    alert('Session expired. Please log in again');
                } else {
                    localStorage.removeItem('accessToken');
                    setUser(null);
                    return;
                }
            }
        };
        tmp();
    }, []);

    return (
        <UserContext.Provider value={{user, setUser}}>
            {props.children}
        </UserContext.Provider>
    );
}

export default UserProvider;