import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";


const NotFound = () => {

    const navigate = useNavigate();

    const onReturn = () => {
        navigate(-1);
    }

    return(
        <div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <div style={{display: 'flex', marginTop: '80px', flexDirection: 'column'}}>
                    <Typography variant="h3" style={{textAlign: 'center'}}>Page Unavailable</Typography>
                    <Typography variant="subtitle1" style={{marginTop: '10px', textAlign: 'center'}}>Please return using the button below.</Typography>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <Button variant="contained" color="error" style={{width: '200px', marginTop: '50px'}} onClick={onReturn}>Return</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotFound;