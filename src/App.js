import { Route, Routes } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import SignupStep1 from "./pages/Signup/SignupStep1/index.tsx";
import SignupStep2 from "./pages/Signup/SignupStep2/index.tsx";
import Login from "./pages/Login/index.tsx";
import Home from "./pages/Home/index.tsx";
import SearchResult from "./pages/SearchResult/index.tsx";
import BrandDetail from "./pages/BrandDetail/index.tsx";
import PerfumeDetail from "./pages/PerfumeDetail/index.tsx";
import MyPage from "./pages/MyPage/index.tsx";
import WriteReview from "./pages/WriteReview";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signupstep1" element={<SignupStep1 />} />
        <Route path="/signupstep2" element={<SignupStep2 />} />
        <Route path="/login" element={<Login />} />
        <Route path="/searchresult" element={<SearchResult />} />
        <Route path="/branddetail" element={<BrandDetail />} />
        <Route path="/perfumedetail" element={<PerfumeDetail/>}/>
        <Route path="/mypage" element={<MyPage/>}/>
        <Route path="/writereview" element={<WriteReview/>}/>
      </Routes>
    </div>
  );
}

export default App;
