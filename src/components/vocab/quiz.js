import { Button, Chip, Divider, Typography } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../provider/userProvider";
import { MainWrapper } from "../../styles/common/main.styles";
import NotFound from "../common/notFound";

const QuizComponent = () => {
    const {bookId} = useParams();
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [quizList, setQuizList] = useState([]);
    const [currentOptions, setCurrentOptions] = useState([]);
    const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
    const [quizEnded, setQuizEnded] = useState(false);
    const {user} = useContext(UserContext);

    useEffect(() => {
        let tmp = async() => {
            try {
                let res = await axios.get(`/api/vocab/quiz/${bookId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                setQuizList(res.data.vocabList);
            } catch (err) {
                console.error(err);
            }
        }
        if(bookId) {
            tmp();
        }
    }, []);
    
    useEffect(() => {
        if (quizList?.length > 0 && currentQuestionIndex < quizList?.length) {
            const values = [
                quizList[currentQuestionIndex].option1,
                quizList[currentQuestionIndex].option2,
                quizList[currentQuestionIndex].option3,
                quizList[currentQuestionIndex].answer
            ];
    
            const shuffledValues = shuffleArray(values);
    
            const options = [
                { label: 'A', value: shuffledValues[0] },
                { label: 'B', value: shuffledValues[1] },
                { label: 'C', value: shuffledValues[2] },
                { label: 'D', value: shuffledValues[3] }
            ];
    
            setCurrentOptions(options);
        }
    }, [quizList, currentQuestionIndex]); 

    useEffect(() => {
        if (quizEnded) {
            // when the quiz ends
            let tmp = async() => {
                try {
                    let percent = correctAnswersCount / quizList.length;
                    let total = quizList.length;
                    await axios.post('/api/history', {
                        userId: user?.id,
                        correctNum: correctAnswersCount,
                        bookId: bookId,
                        percent: percent,
                        total: total
                    }, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                        }
                    });
                    navigate(`/finish`, {state: {bookId: bookId, correctNum: correctAnswersCount, totalNum: total}});
                } catch(err) {
                    console.log(err);
                }
            }
            tmp();
        }
    }, [quizEnded, correctAnswersCount]);

    if(bookId === undefined || !quizList || !(quizList?.length > 0 && currentQuestionIndex < quizList?.length)) {
        return (
            <NotFound/>
        )
    }

    const handleOptionClick = (option) => {
        setSelectedOption(option);
    }

    const getOptionStyle = (option) => {
        return selectedOption === option ? { border: '2px solid #5D6165', borderRadius: '5px', backgroundColor: '#e1effe' } : {};
    }

    const handleNextQuestion = () => {
        if (selectedOption === quizList[currentQuestionIndex].answer) {
            setCorrectAnswersCount(correctAnswersCount + 1);
        }

        if (currentQuestionIndex < quizList.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedOption(null);
        } else {
            setQuizEnded(true);
        }
    };

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    return (
        <MainWrapper>
            <Typography variant="subtitle1" style={{marginTop: '30px'}}>
                Question {currentQuestionIndex + 1} of {quizList.length}
            </Typography>
            <Typography variant="h6">
                {quizList[currentQuestionIndex].vocab}
            </Typography>
            <Divider style={{margin: '20px 0 50px 0'}}/>
            <div style={{display: 'flex', flexDirection: 'column', gap: '50px'}}>
                {
                    currentOptions.map((option) => (
                        <div key={option.label} 
                            style={{...getOptionStyle(option.value), display: 'flex', gap: '15px', alignItems: 'center', padding: '10px'}} 
                            onClick={() => handleOptionClick(option.value)}>
                            <Chip color="primary" label={option.label}></Chip>
                            <Typography variant="body1">
                                {option.value}
                            </Typography>
                        </div>
                    ))
                }
            </div>
            <div style={{display: 'flex', justifyContent: 'center', marginTop: '30px'}}>
                <Button variant="contained" onClick={handleNextQuestion}>{currentQuestionIndex === quizList.length - 1 ? 'Finish' : 'Next'}</Button>
            </div>
        </MainWrapper>
    );
}

export default QuizComponent;