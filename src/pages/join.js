import { Button, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/common/header";
import { AuthInputItem, AuthInputWrapper } from "../styles/auth/auth.styles";
import {useFormik} from "formik";
import { object, ref, string } from "yup";
import axios from "axios";

const joinSchema = object({
    username: string()
        .required('Required field')
        .max(30, 'Username is too long'),
    pw: string()
        .required('Required field')
        .min(6, 'Password must be at least 6 letters'),
    pwCheck: string() 
        .required('Required field')
        .oneOf([ref('pw'), null], 'Passwords do not match')
        .min(6, 'Password must be at least 6 letters')
});

const JoinPage = () => {

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            username: '',
            pw: '',
            pwCheck: ''
        },
        onSubmit: async() => {
            try {
                await axios.post('/api/auth/join', {
                    username: formik.values.username,
                    pw: formik.values.pw
                });
                alert('Created account!');
                navigate('/login', {replace: true});
            } catch(err) {
                if(err.response.data.errno === 1) {
                    alert(err.response.data.msg);
                } else {
                    alert(err.response.data.msg);
                }
            }
        },
        validationSchema: joinSchema
    });

    return(
        <div>
            <Header/>
            <div style={{display: 'flex', marginTop: '60px', flexDirection: 'column', textAlign: 'center'}}>
                <Typography style={{color: '#025b95', marginBottom: '10px'}} variant="h3">Sign Up</Typography>
                <Typography variant="caption">* Required Field</Typography>
            </div>
            <form onSubmit={formik.handleSubmit}>
                <AuthInputWrapper>
                    <AuthInputItem>
                        <TextField name="username" fullWidth label="Username" variant="outlined" value={formik.values.username} onChange={formik.handleChange} onBlur={formik.handleBlur} required/>
                        {formik.touched.username && formik.errors.username && <Typography style={{color: 'red'}}>*{formik.errors.username}</Typography>}
                    </AuthInputItem>
                    <AuthInputItem>
                        <TextField name="pw" type={'password'} fullWidth label="Password" variant="outlined" value={formik.values.pw} onChange={formik.handleChange} onBlur={formik.handleBlur} required/>
                        {formik.touched.pw && formik.errors.pw && <Typography style={{color: 'red'}}>*{formik.errors.pw}</Typography>}
                    </AuthInputItem>
                    <AuthInputItem>
                        <TextField name="pwCheck" type={'password'} fullWidth label="Confirm Password" variant="outlined" value={formik.values.pwCheck} onChange={formik.handleChange} onBlur={formik.handleBlur} required/>
                        {formik.touched.pwCheck && formik.errors.pwCheck && <Typography style={{color: 'red'}}>*{formik.errors.pwCheck}</Typography>}
                    </AuthInputItem>
                    <Button style={{width: '300px'}} variant="contained" type="submit">Create New Account</Button>
                    <Link to={'/login'}>
                        <Typography style={{color: '#025b95'}} variant="body1">Already have an account? Login</Typography>
                    </Link>
                </AuthInputWrapper>
            </form>
        </div>
    );
};

export default JoinPage;