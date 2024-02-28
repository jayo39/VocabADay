import { Button, Typography } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../provider/userProvider";

const UserAccount = () => {

    const {user} = useContext(UserContext);
    const navigate = useNavigate();

    const onPasswordChangeClick = () => {
        navigate('/changePassword');
    }

    return(
        <div>
            <Typography style={{marginTop: '30px', color: '#025b95'}} variant="h4">User Account</Typography>
            <div style={{marginTop: '15px'}}>
                <Typography variant="subtitle1">Account Name: <b>{user?.username}</b></Typography>
            </div>
            <div style={{display: 'flex', alignItems: 'center', columnGap: '15px'}}>
                <Typography variant="subtitle1">Password: <b>******</b></Typography>
                <Button onClick={onPasswordChangeClick}>Change Password</Button>
            </div>
        </div>  
    );
}

export default UserAccount;