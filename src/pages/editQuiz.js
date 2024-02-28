import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import VocabCU from "../components/vocab/vocabCU";

const EditQuiz = () => {

    const {id} = useParams();
    const [book, setBook] = useState(null);
    const [vocabList, setVocabList] = useState([]);

    useEffect(() => {
        const tmp = async() => {
            try {
                let bookRes = await axios.get(`/api/book/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                let vocabRes = await axios.get(`/api/vocab/quiz/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                setBook(bookRes.data.book);
                setVocabList(vocabRes.data.vocabList);
            } catch(err) {
                alert('Server Error');
            }
        };
        tmp();
    }, []);

    if(!vocabList) {
        // if there is no quiz, direct to add page
        // with the book information, so that it auto completes select
        return (
            <VocabCU book={book}/>
        )
    }

    return (
        <VocabCU isUpdate={true} bookId={id} book={book} vocabList={vocabList}/>
    );
}

export default EditQuiz;