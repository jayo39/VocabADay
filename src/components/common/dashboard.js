import { Button, Menu, MenuItem } from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../provider/userProvider";
const Dashboard = () => {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();
    const {setUser} = useContext(UserContext)

    const handleAddBook = (event) => {
      setAnchorEl(null);
      navigate('/addBook');
    };
    const handleAddQuiz = (event) => {
      setAnchorEl(null);
      navigate('/addQuiz');
    };
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
      setAnchorEl(null);
      alert('Logged out');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userRole');
      setUser(null);
      navigate('/login');
    };
    const handleHistory = () => {
        setAnchorEl(null);
        navigate('/myHistory');
    };

    return(
        <div>
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          style={{color: '#fff'}}
        >
          Dashboard
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          {localStorage.getItem('userRole') === 'ADMIN' && <MenuItem onClick={handleAddBook}>Add Book</MenuItem>}
          {localStorage.getItem('userRole') === 'ADMIN' && <MenuItem onClick={handleAddQuiz}>Add Quiz</MenuItem>}
          <MenuItem onClick={handleHistory}>My History</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
    );
};

export default Dashboard;