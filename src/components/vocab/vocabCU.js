import { Button, Divider, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Header from "../../components/common/header";
import { MainWrapper } from "../../styles/common/main.styles";
import { QuizButtonWrap } from "../../styles/vocab/componentWrapper.styles"
import axios from "axios";
import Option from "../../components/vocab/option";
import { useNavigate } from "react-router-dom";

const VocabCU = (props) => {

    const {book, vocabList, isUpdate} = props;
    const [bookList, setBookList] = useState([]);
    const [bookId, setBookId] = useState('');
    const [optionComponents, setOptionComponents] = useState([]);
    const [optionsData, setOptionsData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        let tmp = async() => {
            try {
                let res = await axios.get('/api/book/addQuiz', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });

                setBookList(res.data.bookList);
            } catch(err) {
                console.log(err);
            }
        }
        tmp();
    }, []);

    useEffect(() => {
        if (book && bookList.length) {
            const foundBook = bookList.find(el => el.name === book.name);
            if (foundBook) {
                setBookId(foundBook.id);
            }
        }
    }, [book, bookList]);

    useEffect(() => {
        if (vocabList && vocabList.length > 0) {
            setOptionsData(vocabList);
        }
    }, [vocabList]);

    const handleChange = (event) => {
        setBookId(event.target.value);
    };
  
    const onAddOption = () => {
        setOptionComponents(prevComponents => [
            ...prevComponents,
            <Option key={optionComponents.length} num={optionComponents.length + 1}/>
        ]);
        setOptionsData(prevData => [...prevData, { vocab: '', answer: '', option1: '', option2: '', option3: '' }]);
    }

    const handleOptionChange = (index, field, value) => {
        const newOptionsData = optionsData.map((item, idx) => {
            if (idx === index) {
                return { ...item, [field]: value };
            }
            return item;
        });
        setOptionsData(newOptionsData);
    };

    const handleDeleteOption = (index) => {
        setOptionsData(currentOptionsData => currentOptionsData.filter((_, idx) => idx !== index));
    };

    const onRemoveClick = async() => {
        try {
            await axios.post('/api/book/removeQuiz', {
                bookId: bookId
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            alert('Removed Quiz');
            navigate('/', {replace: true});
        } catch(err) {
            alert(err);
        }
    }

    const submitQuiz = async(event) => {
        event.preventDefault();
        try {
            if(optionsData.length === 0) {
                alert('Must have at least 1 option');
                return;
            }
            if(isUpdate) {
                await axios.post('/api/book/editQuiz', {
                    options: optionsData,
                    bookId: bookId
                }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });
            } else {
                await axios.post('/api/book/addQuiz', {
                    options: optionsData,
                    bookId: bookId
                }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });
            }
            alert('Success!');
            navigate('/', {replace: true});
        } catch(err) {
            alert(err);
        }
    }

    return(
        <div>
            <Header/>
            <form onSubmit={submitQuiz}>
                <MainWrapper>
                    <Typography style={{marginTop: '30px', color: '#025b95'}} variant="h4">Add Vocabulary Quiz</Typography>
                    <div style={{display: 'flex', marginTop: '20px'}}>
                        <FormControl fullWidth size="small" required>
                        <InputLabel>Select Book</InputLabel>
                            <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={bookId}
                                label="Select Book"
                                onChange={handleChange}
                            >
                                {
                                    bookList.map((el) => {
                                        return(
                                            <MenuItem key={el.id} value={el.id}>{el.name}</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </FormControl>
                    </div>
                    <div id="option-wrap">
                        {optionsData.map((data, index) => (
                            <Option
                                key={index}
                                num={index + 1}
                                vocabValue={data.vocab}
                                onVocabChange={(e) => handleOptionChange(index, 'vocab', e.target.value)}
                                answerValue={data.answer}
                                onAnswerChange={(e) => handleOptionChange(index, 'answer', e.target.value)}
                                option1Value={data.option1}
                                onOption1Change={(e) => handleOptionChange(index, 'option1', e.target.value)}
                                option2Value={data.option2}
                                onOption2Change={(e) => handleOptionChange(index, 'option2', e.target.value)}
                                option3Value={data.option3}
                                onOption3Change={(e) => handleOptionChange(index, 'option3', e.target.value)}
                                onDelete={() => handleDeleteOption(index)}
                            />
                        ))}
                    </div>
                    <QuizButtonWrap>
                        <Button style={{width: '300px'}} variant="contained" onClick={onAddOption}>Add More Options</Button>
                    </QuizButtonWrap>
                    <Divider/>
                    <QuizButtonWrap>
                        <Button style={{width: '300px'}} color="success" variant="contained" type="submit">{isUpdate ? 'Edit Quiz' : 'Add Quiz'}</Button>
                    </QuizButtonWrap>
                    {
                        isUpdate ? <QuizButtonWrap>
                            <Button style={{width: '300px'}} color="error" variant="contained" onClick={onRemoveClick}>Remove Quiz</Button>
                        </QuizButtonWrap> : ''
                    }
                </MainWrapper>
            </form>
        </div>
    );
}

export default VocabCU;