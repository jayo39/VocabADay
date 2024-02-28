import { Typography } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../provider/userProvider";

const columns = [
    { field: 'book', headerName: 'Book', width: 250 },
    { field: 'series', headerName: 'Series', width: 250 },
    { field: 'correct', headerName: 'Correct Count', width: 150, type: 'number', },
    { field: 'total', headerName: 'Total Questions', type: 'number', width: 150, },
    { field: 'percent', headerName: '%', type: 'number', width: 100, },
];

const QuizHistory = () => {

    const {user} = useContext(UserContext);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        let tmp = async() => {
            if (!user) {
                setHistory([]);
                return;
            }
            try {
                let res = await axios.get(`/api/history/${user?.id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                })
                setHistory(res.data.history);
                
            } catch(err) {
                console.log(err);
            }
        }
        tmp();
    }, [user]);

    return (
        <div>
            <Typography style={{marginTop: '30px', color: '#025b95'}} variant="h4">Quiz History</Typography>
            <div style={{ height: 400, width: '100%', marginTop: '25px' }}>
                <DataGrid
                    rows={history}
                    columns={columns}
                    initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                    }}
                    pageSizeOptions={[5, 10]}
                />
            </div>
        </div>
    );
}

export default QuizHistory;