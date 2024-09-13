import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./scenes/home";
import Game from "./scenes/game";
import LeaderBoard from "./scenes/leaderboard";
import About from "./scenes/about";
import Login from "./scenes/login";
import Register from "./scenes/register";
import NotFound from "./scenes/notfoundpage";
import { useDispatch, useSelector } from "react-redux";
import { useFetchUserQuery } from "./state/api";
import { setUser } from "./state/user/userSlice";

function App() {

  const token = useSelector(state => state.token.token);
  const [skip, setSkip] = useState(true);
  const dispatch = useDispatch();
  
  const { data, error } = useFetchUserQuery({ token }, {skip});

  useEffect(() => {
    if (data) {
      dispatch(setUser(data.user));
    }
  }, [data, error, dispatch]);

  useEffect(() => {
    if(token){
      setSkip(false);
    }
  }, [token]);

  return (
    <>
     <BrowserRouter>
      <Routes>
        {!token ? 
          <>
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Login />} />
          </> : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/game" element={<Game />} />
            <Route path="/leaderboard" element={<LeaderBoard />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </>
        )}
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App