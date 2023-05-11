import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from './pages/Signup';
import Login from "./pages/Login";
import CreateBlog from "./pages/CreateBlog";
import HomePage from "./pages/HomePage";
import ShowCompleteBlog from "./pages/ShowCompleteBlog";
import NavScrollExample from "./pages/Navbar";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function App() {

  let dispatch = useDispatch()

  let [token, setToken] = useState(null)
  let [userDtl, setUserDtl] = useState({})

  useEffect(() => {
    setToken(localStorage.getItem("token"))
    dispatch({
      type: "@LOGINTOKEN",
      payload: localStorage.getItem("token")
    })
    setUserDtl(JSON.parse(localStorage.getItem("userinfo")))
  }, [dispatch])

  return (
    <div >
      <BrowserRouter>
        <NavScrollExample tok={setToken} userdt={setUserDtl} />
        <Routes>
          <Route path='/' element={<HomePage token={token} userDtl={userDtl} />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path="/createblog" element={<CreateBlog />} />
          <Route path="/showcompleteblog" element={<ShowCompleteBlog />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


// Fetch the cryptocurrency price from the API: https://api.coinlore.net/api/ticker/?id=<id>
// Show a dropdown which has BTC, ETH, DOGE and a button called "Fetch price"
// To fetch BTC price, use id = 90, for ETH id = 80, for DOGE id = 2.
// Fetch and show the price on screen when user clicks on the button.
// Could complete partially.