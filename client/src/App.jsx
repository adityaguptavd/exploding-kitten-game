import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./scenes/home";
import Game from "./scenes/game";
import LeaderBoard from "./scenes/leaderboard";
import About from "./scenes/about";
import Login from "./scenes/login";
import Register from "./scenes/register";
import NotFound from "./scenes/notfoundpage";
import { useSelector } from "react-redux";

function App() {

  const token = useSelector(state => state.token.token);

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