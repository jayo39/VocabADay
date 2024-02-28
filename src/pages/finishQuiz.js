import { Button } from "@mui/material";
import Header from "../components/common/header"
import { useLocation, useNavigate } from "react-router-dom";
import NotFound from "../components/common/notFound";
import BookContainer from "../components/vocab/bookContainer";
import { MainWrapper } from "../styles/common/main.styles";
import ResultContainer from "../components/vocab/resultContainer";
import { ComponentWrapper } from "../styles/vocab/componentWrapper.styles";
import { useEffect, useState } from "react";
import axios from "axios";

const FinishQuiz = () => {
    const location = useLocation();
    let bookId = location.state?.bookId;
    let correctNum = location.state?.correctNum;
    let totalNum = location.state?.totalNum;
    let [book, setBook] = useState(null);
    let [vocabList, setVocabList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        let tmp = async() => {
            try {
                let resBook = await axios.get(`/api/book/${bookId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                let resVocab = await axios.get(`/api/vocab/quiz/${bookId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                setBook(resBook.data.book);
                setVocabList(resVocab.data.vocabList);
            } catch(err) {
                console.log(err);
            }
        }
        tmp();
    }, [bookId]);

    if(!bookId || correctNum === undefined) {
        return (
            <div>
                <Header/>
                <NotFound/>
            </div>
        )
    }

    const handleHistory = () => {
        navigate('/myHistory');
    };

    const handleReturn = () => {
        navigate('/');
    };

    return(
        <div>
            <Header/>
            <MainWrapper>
                <ComponentWrapper>
                    {vocabList && <ResultContainer correctNum={correctNum} totalNum={totalNum} vocabList={vocabList}/>}
                    {book && <BookContainer book={book}/>}
                </ComponentWrapper>
                <ComponentWrapper>
                    <Button variant="contained" onClick={handleHistory}>View My History</Button>
                    <Button color="error" variant="contained" onClick={handleReturn}>Return</Button>
                </ComponentWrapper>
            </MainWrapper>
        </div>
    )
}

export default FinishQuiz;