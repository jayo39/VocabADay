import { Divider } from "@mui/material";
import Header from "../components/common/header";
import QuizHistory from "../components/user/quizHistory";
import UserAccount from "../components/user/userAccount";
import { MainWrapper } from "../styles/common/main.styles";

const MyHistory = () => {

    return (
        <div>
            <Header/>
            <MainWrapper>
                <UserAccount/>
                <Divider style={{marginTop: '10px'}}/>
                <QuizHistory/>
            </MainWrapper>
        </div>
    );
}

export default MyHistory;