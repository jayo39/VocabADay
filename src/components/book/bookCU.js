import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, TextField, Typography, Button } from "@mui/material";
import { useState } from "react";
import Header from "../../components/common/header";
import { ImgInput, TextFieldWrap } from "../../styles/add/add.styles";
import { MainWrapper } from "../../styles/common/main.styles";
import { object, string } from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
};

const genres = [
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

const schema = object({
    title: string()
        .required('Required Field')
        .max(50, 'Title cannot be longer than 50 characters'),
    series: string()
        .required('Required Field')
        .max(50, 'Series cannot be longer than 50 characters'),
    description: string()
        .required('Required Field')
        .max(200, 'Description cannot be longer than 200 characters')
});

const BookCU = (props) => {

    const {isUpdate, bookId, book, genre} = props;
    const [bookGenre, setBookGenre] = useState(isUpdate ? genre : []);
    const initialImgState = isUpdate && book.img 
    ? { id: new Date().toString(), file: null, src: `${book.img}` } 
    : { id: '', file: null, src: '' };
    const [img, setImg] = useState(initialImgState);
    const navigate = useNavigate();

    const handleChange = (event) => {
        const {
          target: { value },
        } = event;
        setBookGenre(
          typeof value === 'string' ? value.split(',') : value,
        );
    };

    const formik = useFormik({
        initialValues: {
            title: isUpdate ? book.name : '',
            series: isUpdate ? book.series : '',
            description: isUpdate ? book.description : '',
            genre: isUpdate ? genre.join(', ') : ''
        },
        onSubmit: async() => {
            try {
                let formData = new FormData();

                if(img !== null) {
                    formData.append('image', img.file);
                }

                formData.append('title', formik.values.title);
                formData.append('series', formik.values.series);
                formData.append('description', formik.values.description);
                formData.append('genres', bookGenre);

                if(isUpdate) {
                    await axios.put(`/api/book/${bookId}`, formData, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                } else {
                    await axios.post('/api/book/add', formData, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                }
                alert('Success!');
                navigate('/', {replace: true});
            } catch(err) {
                alert('Server Error');
            }
        },
        validationSchema: schema
    });

    const onImgChange = (event) => {
        if(event.target.files.length === 0) return;

        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);

        reader.onloadend = () => {
            setImg({id: new Date().toString(), file: event.target.files[0], src:reader.result})
        };
    };

    const onDeleteClick = async() => {
        try {
            await axios.delete(`/api/book/${bookId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            alert('Deleted');
            navigate('/', {replace: true});
        } catch(err) {
            alert('Server Error');
        }
    }

    return(
        <div>
            <Header/>
            <form onSubmit={formik.handleSubmit}>
                <MainWrapper>
                    <Typography style={{marginTop: '30px', color: '#025b95'}} variant="h4">Add Book</Typography>
                    <TextFieldWrap>
                        <div>
                            <TextField name="title" fullWidth label="Title" variant="standard" value={formik.values.title} onChange={formik.handleChange} onBlur={formik.handleBlur} required/>
                            {formik.touched.title && formik.errors.title && <Typography style={{color: 'red'}}>*{formik.errors.title}</Typography>}
                        </div>
                        <div>
                            <TextField name="series" fullWidth label="Series" variant="standard" value={formik.values.series} onChange={formik.handleChange} onBlur={formik.handleBlur} required/>
                            {formik.touched.series && formik.errors.series && <Typography style={{color: 'red'}}>*{formik.errors.series}</Typography>}
                        </div>
                        <div>
                            <TextField name="description" fullWidth label="Description" variant="standard" value={formik.values.description} onChange={formik.handleChange} onBlur={formik.handleBlur} required/>
                            {formik.touched.description && formik.errors.description && <Typography style={{color: 'red'}}>*{formik.errors.description}</Typography>}
                        </div>
                        <div>
                            <label><Typography style={{color: '#636363'}}>Cover Image</Typography></label>
                            <ImgInput src={img.src}><Typography variant="h5" style={{color: '#636363'}}>+ Click to Add</Typography><input style={{display: 'none'}} accept="image/*" type="file" onChange={onImgChange}/></ImgInput>
                        </div>
                    </TextFieldWrap>
                    
                    <div style={{marginTop: '30px'}}>
                        <FormControl size="small" fullWidth required>
                                <InputLabel>Genre</InputLabel>
                                    <Select
                                    multiple
                                    value={bookGenre}
                                    onChange={handleChange}
                                    input={<OutlinedInput label="Tag" />}
                                    renderValue={(selected) => selected.join(', ')}
                                    MenuProps={MenuProps}
                                    name="genre"
                                    >
                                    {genres.map((genre) => (
                                        <MenuItem key={genre} value={genre}>
                                        <Checkbox checked={bookGenre.indexOf(genre) > -1} />
                                        <ListItemText primary={genre} />
                                        </MenuItem>
                                    ))}
                                    </Select>
                            </FormControl>
                    </div>
                    <div style={{margin: '30px 0'}}>
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <Button style={{width: '300px'}} variant="contained" type="submit">{isUpdate ? 'Edit Book' : 'Add Book'}</Button>
                        </div>
                        {
                            isUpdate ? <div style={{display: 'flex', justifyContent: 'center', marginTop: '15px'}}>
                                <Button style={{width: '300px'}} color="error" onClick={onDeleteClick}>Delete Book</Button>
                            </div> : ''
                        }
                    </div>
                    
                </MainWrapper>
            </form>
        </div>
    );
}

export default BookCU;