import { Route, Routes } from "react-router-dom";
import './App.css';
import Home from './pages/Home';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/home" exact element={<Home />} />
        <Route path="/login" exact element={<LogIn />} />
        <Route path="/signup" exact element={<SignUp />} />
      </ Routes>
    </div>
  );
}

export default App;
