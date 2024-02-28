import { Link } from "react-router-dom";
import { CustomHeader } from "../../styles/common/header.styles";
import Typography from '@mui/material/Typography';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Dashboard from "./dashboard";

const Header = () => {

    const menus = [
        {id : 1, title : 'Login'},
        {id : 2, title : 'Join'}
    ];

    return (
        <CustomHeader>
            <Link style={{textDecoration: 'none', color: '#fff'}} to={'/'}>
                <Typography variant="h5">VOCAB-A-DAY</Typography>
            </Link>
            <div style={{display: 'flex', columnGap: '15px'}}>
                {
                    localStorage.getItem('accessToken') ? 
                        <Dashboard/>
                         : menus.map((el, index) => (
                            <Link key={index} style={{textDecoration: 'none', color: '#fff'}} to={el.id === 1 ? '/login' : el.id === 2 ? '/join' : '/'}>
                                <Typography variant="button">{el.title}</Typography>
                            </Link>
                        ))
                }
            </div>
        </CustomHeader>
    );
};

export default Header;