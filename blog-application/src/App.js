import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./pages/Home";
import UserPosts from "./pages/UserPosts";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import PostOfOtherUser from "./pages/PostOfOtherUser";
import Post from "./pages/Post";


function App() {
    return (
        <div className="">
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path='/login' element={<Login/>}></Route>
                <Route path='/signup' element={<Signup/>}></Route>
                <Route path='/user-posts' element={<UserPosts/>}></Route>
                <Route path='/create-post' element={<CreatePost/>}></Route>
                <Route path='/edit-post/:id' element={<EditPost/>}></Route>
                <Route path='/posts/:id' element={<PostOfOtherUser/>}></Route>
                <Route path='/post/:id' element={<Post/>}></Route>
            </Routes>
        </div>
    );
}

export default App;
