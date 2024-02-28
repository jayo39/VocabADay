import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const BookContainer = (props) => {
    return(
        <Card style={{minWidth: '40%'}}>
            <CardMedia
                component="img"
                sx={{ height: 430 }}
                image={props.book.img}
                title="book img"
            />
            <CardContent>
                <Typography variant="h4">
                    {props.book.name}
                </Typography>
                <Typography variant="h6">
                    {props.book.series}
                </Typography>
                <Typography variant="body2" color="text.secondary" style={{marginTop: '10px'}}>
                    {props.book.description}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default BookContainer;