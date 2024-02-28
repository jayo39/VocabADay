import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const FrontList = (props) => {

    let [bookList, setBookList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        let tmp = async() => {
            try{
                let res = await axios.get(`/api/book/?order=${props.order}`);
                setBookList(res.data.bookList);
            } catch(err) {

            }
        }

        tmp();
    }, [props.order]);

    const onQuizClick = (el) => {
        navigate(`/quiz/${el.id}`);
    }

    const onEditClick = (el) => {
        navigate(`/editBook/${el.id}`);
    }

    const onEditQuizClick = (el) => {
        navigate(`/editQuiz/${el.id}`);
    }


    return(
        <div>
            <Typography style={{marginTop: '30px', color: '#025b95'}} variant="h4">{props.order === 'newest' ? 'Just Added' : 'Popular Books'}</Typography>
            <div style={{display: 'flex', columnGap: '30px', overflowX: 'auto', marginTop: '20px'}}>
                {
                    bookList.map((el) => {
                        return (
                            <Card key={el.id} style={{ minWidth: '230px', display: 'flex', flexDirection: 'column' }}>
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
        </div>
    );
}

export default FrontList;