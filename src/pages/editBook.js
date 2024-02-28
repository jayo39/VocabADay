import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookCU from "../components/book/bookCU"

const EditBook = () => {

    const {id} = useParams();
    const [book, setBook] = useState(null);
    const [genre, setGenre] = useState([]);

    useEffect(() => {
        const tmp = async() => {
            try {
                let bookRes = await axios.get(`/api/book/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                let genreRes = await axios.get(`/api/genre/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                setBook(bookRes.data.book);
                for(let i = 0; i < genreRes.data.genres.length; i++) {
                    setGenre(prevGenres => [...prevGenres, genreRes.data.genres[i].name]);
                }
            } catch(err) {
                alert('Server Error');
            }
        };

        tmp();
    }, []);

    if(book === null) {
        return (
            <h1>Loading..</h1>
        )
    }

    return (
        <BookCU isUpdate={true} bookId={id} book={book} genre={genre}/>
    )
}

export default EditBook;