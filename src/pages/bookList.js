import BookList from "../components/bookList/bookList";
import Header from "../components/common/header"
import SearchBar from "../components/common/searchBar";
import { MainWrapper } from "../styles/common/main.styles";

const BookListPage = () => {
    return(
        <div>
            <Header/>
            <MainWrapper>
                <SearchBar/>
                <BookList/>
            </MainWrapper>
        </div>
    );
};

export default BookListPage;