import { Typography } from "@mui/material";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import FrontList from "./components/bookList/frontList";
import Carousel from "./components/common/carousel";
import Header from "./components/common/header";
import SearchBar from "./components/common/searchBar"
import { SearchContext } from "./provider/searchProvider";
import { MainWrapper } from "./styles/common/main.styles";

const App = () => {

  const {setGenre} = useContext(SearchContext);
  const navigate = useNavigate();

  const onBrowse = () =>{
    setGenre('');
    navigate('/list');
  }

  return (
    <div>
      <Header/>
      <MainWrapper>
          <SearchBar/>
        <Carousel/>
        <FrontList order={'popular'}/>
        <FrontList order={'newest'}/>
        <div style={{display: 'flex', justifyContent: 'center', margin: '20px 0 40px 0'}}>
          <Link style={{textDecoration: 'underline', color: '#1876d1'}} onClick={onBrowse}><Typography variant="subtitle1">Browse All Books</Typography></Link>
        </div>
      </MainWrapper>
    </div>
  );
}

export default App;
