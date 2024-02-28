import { Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { object, string } from "yup";
import Header from "../components/common/header";
import { AuthInputItem, AuthInputWrapper } from "../styles/auth/auth.styles";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../provider/userProvider";

const loginSchema = object({
    username: string()
        .required('Required field'),
    pw: string()
        .required('Required field')
});

const LoginPage = () => {

    const navigate = useNavigate();
    const {setUser} = useContext(UserContext);

    const formik = useFormik({
        initialValues: {
            username: '',
            pw: ''
        },
        onSubmit: async() => {
            try {
                let res = await axios.post('/api/auth/login', {
                    username: formik.values.username,
                    pw: formik.values.pw
                });
                localStorage.removeItem('accessToken');
                localStorage.setItem('accessToken', res.data.accessToken);
                localStorage.setItem('userRole', res.data.role);
                setUser(res.data.user);
                alert(`Welcome ${formik.values.username}!`);
                navigate('/');
            } catch(err) {
                if(err.response.data.errno === 1) {
                    alert(err.response.data.msg);
                } else {
                    alert(err.response.data.msg);
                }
            }
        },
        validationSchema: loginSchema
    });

    return(
        <div>
            <Header/>
            <div style={{display: 'flex', marginTop: '60px', flexDirection: 'column', textAlign: 'center'}}>
                <Typography style={{color: '#025b95', marginBottom: '10px'}} variant="h3">Login</Typography>
                <Typography variant="caption">* Required Field</Typography>
            </div>
            <form onSubmit={formik.handleSubmit}>
                <AuthInputWrapper>
                    <AuthInputItem>
                        <TextField name="username" fullWidth label="Username" variant="outlined" 
                        value={formik.values.username} onChange={formik.handleChange} onBlur={formik.handleBlur} 
                        required/>
                        {formik.touched.username && formik.errors.username && 
                        <Typography style={{color: 'red'}}>*{formik.errors.username}</Typography>}
                    </AuthInputItem>
                    <AuthInputItem>
                        <TextField name="pw" type={'password'} fullWidth label="Password" variant="outlined" 
                        value={formik.values.pw} onChange={formik.handleChange} onBlur={formik.handleBlur} 
                        required/>
                        {formik.touched.pw && formik.errors.pw && 
                        <Typography style={{color: 'red'}}>*{formik.errors.pw}</Typography>}
                    </AuthInputItem>
                    <Button style={{width: '300px'}} variant="contained" type="submit">Login</Button>
                    <Link to={'/join'}>
                        <Typography style={{color: '#025b95'}} variant="body1">
                            Don't have an account? Sign up
                        </Typography>
                    </Link>
                </AuthInputWrapper>
            </form>
        </div>
    );
};

export default LoginPage;