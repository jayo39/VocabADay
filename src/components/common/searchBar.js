import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Genre from './genre';
import { useContext, useEffect, useState } from 'react';
import { SearchContext } from '../../provider/searchProvider';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {

    const {keyword, setKeyword, setGenre} = useContext(SearchContext);
    const [searchInput, setSearchInput] = useState('');
    const navigate = useNavigate();

    useEffect(()=> {
        setSearchInput(keyword);
    }, [])

    const onInputChange = (e) => {
        setSearchInput(e.target.value);
        if(e.target.value === '') {
            setSearchInput('');
        }
    }

    const onKeyDown = (e) => {
        if(e.key === 'Enter') {
            onSearch();
        }
    }

    const onSearch = () => {
        setKeyword(searchInput);
        setGenre('');
        navigate('/list');
    }

    return (
        <div style={{width: '100%', marginTop: '30px'}}>
            <div style={{display: 'flex'}}>
                <TextField sx={{
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                        '& .MuiOutlinedInput-root': {
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 0
                        }
                    }} fullWidth id="search" size='small' label='Search by title or series' onChange={onInputChange} value={searchInput} onKeyDown={onKeyDown}/>
                <Button style={{borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px', backgroundColor: '#025b95', boxShadow: 'none'}} variant='contained' onClick={onSearch}><SearchIcon/></Button>
            </div>
            <div>
                <Genre></Genre>
            </div>
        </div>

    );
}

export default SearchBar;