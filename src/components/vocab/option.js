import { Chip, Divider, IconButton, TextField } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { TextFieldWrap } from "../../styles/add/add.styles";

const Option = ({ num, vocabValue, onVocabChange, answerValue, onAnswerChange, option1Value, onOption1Change, option2Value, onOption2Change, option3Value, onOption3Change, onDelete }) => {
    return (
        <TextFieldWrap>
            <Divider>
                <Chip label={`Question ${num}`} size="small" />
            </Divider>
            <div style={{marginTop: '-20px'}}>
                <TextField
                    name="vocab" 
                    fullWidth 
                    label={`Vocabulary ${num}`} 
                    variant="standard" 
                    required
                    value={vocabValue}
                    onChange={onVocabChange}
                />
            </div>
            <div>
                <TextField 
                    name="answer" 
                    fullWidth 
                    label="Answer Option" 
                    variant="standard" 
                    required
                    value={answerValue}
                    onChange={onAnswerChange}
                />
            </div>
            <div>
                <TextField 
                    name="option1" 
                    fullWidth 
                    label="Option 1" 
                    variant="standard" 
                    required
                    value={option1Value}
                    onChange={onOption1Change}
                />
            </div>
            <div>
                <TextField 
                    name="option2" 
                    fullWidth 
                    label="Option 2" 
                    variant="standard" 
                    required
                    value={option2Value}
                    onChange={onOption2Change}
                />
            </div>
            <div>
                <TextField 
                    name="option3" 
                    fullWidth 
                    label="Option 3" 
                    variant="standard" 
                    required
                    value={option3Value}
                    onChange={onOption3Change}
                />
            </div>
            <div style={{display: 'flex', justifyContent: 'end'}}>
                <IconButton style={{width: 'fit-content'}} aria-label="delete" size="large" onClick={onDelete}>
                    <DeleteIcon />
                </IconButton>
            </div>
        </TextFieldWrap>
    );  
};


export default Option;