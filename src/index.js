import React from 'react';
import ReactDOM from 'react-dom/client';
import {RouterProvider, createBrowserRouter} from "react-router-dom";
import App from './App';
import { withLogin, withLoginAndAdmin } from './hoc/hoc';
import AddBook from './pages/addBook';
import AddQuiz from './pages/addQuiz';
import BookListPage from './pages/bookList';
import ChangePassword from './pages/changePassword';
import EditBook from './pages/editBook';
import EditQuiz from './pages/editQuiz';
import FinishQuiz from './pages/finishQuiz';
import JoinPage from './pages/join';
import LoginPage from './pages/login';
import MyHistory from './pages/myHistory';
import Quiz from './pages/quiz';
import SearchProvider from './provider/searchProvider';
import UserProvider from './provider/userProvider';
import './styles/common/index.css'

const router = createBrowserRouter([
  {path: "/", element: <App/>},
  {path: "/join", element: <JoinPage/>},
  {path: "/login", element: <LoginPage/>},
  {path: "/addBook", element: withLoginAndAdmin(<AddBook/>)},
  {path: "/addQuiz", element: withLoginAndAdmin(<AddQuiz/>)},
  {path: "/list", element: <BookListPage/>},
  {path: "/quiz/:bookId", element: withLogin(<Quiz/>)},
  {path: "/finish", element: withLogin(<FinishQuiz/>)},
  {path: "/myHistory", element: withLogin(<MyHistory/>)},
  {path: "/changePassword", element: withLogin(<ChangePassword/>)},
  {path: "/editBook/:id", element: withLoginAndAdmin(<EditBook/>)},
  {path: "/editQuiz/:id", element: withLoginAndAdmin(<EditQuiz/>)}
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserProvider>
    <SearchProvider>
        <RouterProvider router={router}/>
    </SearchProvider>
  </UserProvider>
);