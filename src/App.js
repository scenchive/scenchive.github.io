import { Route, Routes } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import SignupStep1 from "./pages/Signup/SignupStep1/index.tsx"
import SignupStep2 from "./pages/Signup/SignupStep2/index.tsx";
import Login from "./pages/Login/index.tsx";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/signupstep1" element={<SignupStep1 />} />
        <Route path="/signupstep2" element={<SignupStep2/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
