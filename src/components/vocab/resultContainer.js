import { Card, CardContent, Divider, List, ListItem, ListItemText, Typography } from "@mui/material";

const ResultContainer = (props) => {
    return (
        <Card style={{minWidth: '60%'}}>
            <CardContent>
                <Typography variant="h3">
                    {(props.correctNum / props.totalNum) > 0.5 ? 'You Passed!' : 'Failed - Try Again'}
                </Typography>
                <Typography variant="h5">
                    {`${((props.correctNum / props.totalNum) * 100).toFixed(2)}%`}
                </Typography>
                <Divider style={{margin: '10px 0 5px 0'}}/>
                <Typography variant="subtitle1">{props.correctNum} / {props.totalNum}</Typography>
                <Typography variant="h6" style={{marginTop: '10px'}}>Vocabulary:</Typography>
                <div style={{display: 'flex', columnGap: '40px'}}>
                    <List>
                        {
                            props.vocabList.map((vocab, index)=>{
                                return (
                                    <ListItem key={index}>
                                        <ListItemText><b>{vocab.vocab}</b> - {vocab.answer}</ListItemText>
                                    </ListItem>
                                )
                            })
                        }
                    </List>
                </div>
            </CardContent>
        </Card>
    );
}

export default ResultContainer;