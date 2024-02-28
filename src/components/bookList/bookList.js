import { Button, Card, CardActions, CardContent, CardMedia, Pagination, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { SearchContext } from "../../provider/searchProvider";

const BookList = () => {
    const {genre} = useContext(SearchContext);
    const {keyword, bookList, setBookList} = useContext(SearchContext);
    const navigate = useNavigate();
    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    let cntPerPage = 6;

    useEffect(() => {

        let tmp = async() => {
            try {
                let res = await axios.get(`/api/book/list?genre=${genre}&keyword=${keyword}&currentPage=${currentPage}&cnt=${cntPerPage}`);
                setBookList(res.data.bookList);
                setTotalPage(Math.ceil(res.data.totalCnt / cntPerPage))
            } catch(err) {
                console.log(err);
            }
        };

        tmp();

    }, [currentPage, genre, keyword]);

    useEffect(() => {
        setCurrentPage(1);
    }, [genre]);

    const onQuizClick = (el) => {
        navigate(`/quiz/${el.id}`);
    }

    const onEditClick = (el) => {
        navigate(`/editBook/${el.id}`);
    }

    const onEditQuizClick = (el) => {
        navigate(`/editQuiz/${el.id}`);
    }

    const handleChange = (e, v) => {
        setCurrentPage(v);
    }

    return (
        <div>
            <Typography style={{marginTop: '30px', color: '#025b95'}} variant="h4">Browse Books {genre ? `- ${genre}` : ''}</Typography>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginTop: '20px'}}>
                {
                    bookList.map((el) => {
                        return (
                            <Card key={el.id} style={{ flex: '1 0 30%', display: 'flex', flexDirection: 'column' }}>
                                <CardMedia
                                    component="img"
                                    height="180"
                                    image={el.img}
                                />
                                <CardContent style={{ flexGrow: 1 }}>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {el.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {el.description}
                                    </Typography>
                                </CardContent>
                                <CardActions style={{ marginTop: 'auto' }}>
                                    <Button size="small" onClick={() => onQuizClick(el)}>Take Vocab Quiz</Button>
                                </CardActions>
                                <CardActions style={{ marginTop: '-13px' }}>
                                    {localStorage.getItem('userRole') === 'ADMIN' && <Button size="small" color="error" onClick={() => onEditClick(el)}>Edit Book</Button>}
                                    {localStorage.getItem('userRole') === 'ADMIN' && <Button size="small" color="error" onClick={() => onEditQuizClick(el)}>Edit Quiz</Button>}
                                </CardActions>
                            </Card>
                        );  
                    })
                }
            </div>
            <div style={{display: 'flex', justifyContent: 'center', margin: '25px 0 20px 0'}}>
                <Pagination page={currentPage} count={totalPage} onChange={handleChange}></Pagination>
            </div>
        </div>
    );
}

export default BookList;