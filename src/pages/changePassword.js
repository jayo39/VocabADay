import { Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { object, ref, string } from "yup";
import Header from "../components/common/header";
import { AuthInputItem, AuthInputWrapper } from "../styles/auth/auth.styles";

const passwordSchema = object({
    currentPassword: string()
        .required('Required field'),
    newPassword: string()
        .required('Required field')
        .min(6, 'Password must be at least 6 letters'),
    newPasswordCheck: string()
        .required('Required field')
        .oneOf([ref('newPassword'), null], 'Passwords do not match')
        .min(6, 'Password must be at least 6 letters')
});

const ChangePassword = () => {

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            currentPassword: '',
            newPassword: '',
            newPasswordCheck: ''
        },
        onSubmit: async() => {
            try {
                await axios.put('/api/auth/changePassword', {
                    currentPassword: formik.values.currentPassword,
                    newPassword: formik.values.newPassword
                }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                alert('Changed Password!');
                navigate('/myHistory');
            } catch(err) {
                if(err.response.data.errno === 1) {
                    alert(err.response.data.msg);
                } else {
                    alert(err.response.data.msg);
                }
            }
        },
        validationSchema: passwordSchema
    });

    return (
        <div>
            <Header/>
            <div style={{display: 'flex', marginTop: '60px', flexDirection: 'column', textAlign: 'center'}}>
                <Typography style={{color: '#025b95', marginBottom: '10px'}} variant="h3">Change Password</Typography>
                <Typography variant="caption">* Required Field</Typography>
            </div>
            <form onSubmit={formik.handleSubmit}>
                <AuthInputWrapper>
                    <AuthInputItem>
                        <TextField name="currentPassword" fullWidth label="Current Password" variant="outlined" value={formik.values.currentPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" required/>
                        {formik.touched.currentPassword && formik.errors.currentPassword && <Typography style={{color: 'red'}}>*{formik.errors.currentPassword}</Typography>}
                    </AuthInputItem>
                    <AuthInputItem>
                        <TextField name="newPassword" fullWidth label="New Password" variant="outlined" value={formik.values.newPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" required/>
                        {formik.touched.newPassword && formik.errors.newPassword && <Typography style={{color: 'red'}}>*{formik.errors.newPassword}</Typography>}
                    </AuthInputItem>
                    <AuthInputItem>
                        <TextField name="newPasswordCheck" fullWidth label="Confirm New Password" variant="outlined" value={formik.values.newPasswordCheck} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" required/>
                        {formik.touched.newPasswordCheck && formik.errors.newPasswordCheck && <Typography style={{color: 'red'}}>*{formik.errors.newPasswordCheck}</Typography>}
                    </AuthInputItem>
                    <Button style={{width: '300px'}} variant="contained" type="submit">Update Password</Button>
                </AuthInputWrapper>
            </form>
        </div>
    );
}

export default ChangePassword;