import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const withLogin = (component) => {

    const WithAuth = () => {
        const [login, setLogin] = useState(false);
        const navigate = useNavigate();

        useEffect(()=>{
            const token = localStorage.getItem('accessToken');
            if(token === null) {
                alert('Please login');
                navigate('/login', {replace: true});
            } else {
                setLogin(true);
            }
        }, [navigate]);
    
        return (
            <>
                {login 
                    ? component 
                    : <>
                        <h1>Loading page..</h1>
                    </>
                } 
            </>
        );
    }

    return <WithAuth/>
    
}

export const withLoginAndAdmin = (component) => {

    const WithAuthAndAdmin = () => {
        const [adminLogin, setAdminLogin] = useState(false);
        const navigate = useNavigate();

        useEffect(()=>{
            const token = localStorage.getItem('accessToken');
            const role = localStorage.getItem('userRole');
            if(token === null) {
                alert('Please login');
                navigate('/login', {replace: true});
            } else if(role === null || role === 'USER') {
                alert('No permission');
                navigate('/', {replace: true});
            } else {
                setAdminLogin(true);
            }

        }, [navigate]);
    
        return (
            <>
                {adminLogin 
                    ? component 
                    : <>
                        <h1>Loading page..</h1>
                    </>
                } 
            </>
        );
    }

    return <WithAuthAndAdmin/>
    
}