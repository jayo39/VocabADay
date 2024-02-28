import Button from '@mui/material/Button';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../provider/searchProvider';
import { GenreWrapper } from '../../styles/common/genreList';

const seriesList = [
    'Adventure',
    'Horror',
    'Friendship',
    'Mystery',
    'Science Fiction',
    'Humor',
    'Romance',
    'Dystopian',
    'Historical Fiction',
    'Non Fiction',
    'Fairy Tale',
    'Survival'
];

const Genre = () => {

    const navigate = useNavigate();
    const {setGenre} = useContext(SearchContext);

    const onClick = (el) => {
        setGenre(el);
        navigate('/list');
    }

    return (
        <GenreWrapper>
            {
                seriesList.map((el, index) => {
                    return (
                        <Button key={index} size='small' style={{margin: '10px 5px 5px 5px', color: '#025b95'}} onClick={() => onClick(el)}>{el}</Button>
                    );
                })
            }
        </GenreWrapper>
    );
};

export default Genre;