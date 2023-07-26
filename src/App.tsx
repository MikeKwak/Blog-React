import { Route, Routes } from 'react-router-dom';
import PostListPage from './pages/PostListPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WritePage from './pages/WritePage';
import PostPage from './pages/PostPage';
import GroupListPage from './pages/GroupListPage';

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<PostListPage />} />
                <Route path="/login" element={<LoginPage />} />
                {/* <Route path='/register' element={<RegisterPage />} /> */}
                {/* <Route path='/write' element={<WritePage />} /> */}
                {/* <Route path='/@:username' element={<GroupListPage/>} /> */}
                {/* <Route path={'/:username'} element={<PostListPage />}  /> */}
                <Route path={'/:username/groups'} element={<GroupListPage />}/>
                <Route path={'/:username/:groupID'} element={<PostListPage />}/>

                {/* <Route path='/'> */}
                {/* <Route index element={<PostListPage />} /> */}
                {/* <Route path=':postId' element={<PostPage />} /> */}
                {/* </Route> */}
                {/* <Route path='/:username/groups' element={<GroupListPage/>} /> */}
            </Routes>
        </>
    );
}

export default App;
