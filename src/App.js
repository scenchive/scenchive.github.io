import { Route, Routes } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Login from "./pages/Login/index.tsx";
import Signup from "./pages/Signup/index.tsx";
import Home from "./pages/Home/index.tsx";
import SearchResult from "./pages/SearchResult/index.tsx";
import BrandDetail from "./pages/BrandDetail/index.tsx";
import PerfumeDetail from "./pages/PerfumeDetail/index.tsx";
import MyPage from "./pages/MyPage/index.tsx";
import WriteReview from "./pages/WriteReview";
import KeywordSearch from "./pages/KeywordSearch";
import RecommendResult from "./pages/RecommendResult";
import Commmunity from "./pages/Community";
import CommunityWrite from "./pages/CommunityWrite";
import CommunityDetail from "./pages/CommunityDetail";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/signupstep1" element={<SignupStep1 />} />
        <Route path="/signupstep2" element={<SignupStep2 />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/searchresult" element={<SearchResult />} />
        <Route path="/branddetail" element={<BrandDetail />} />
        <Route path="/perfumedetail" element={<PerfumeDetail />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/writereview" element={<WriteReview />} />
        <Route path="/keywordsearch" element={<KeywordSearch />} />
        <Route path="/recommendresult" element={<RecommendResult />} />
        <Route path="/perfumedetail" element={<PerfumeDetail/>}/>
        <Route path="/mypage" element={<MyPage/>}/>
        <Route path="/writereview" element={<WriteReview/>}/>
        <Route path="/community" element={<Commmunity/>}/>
        <Route path="/communitywrite" element={<CommunityWrite/>}/>
        <Route path="/communitydetail" element={<CommunityDetail/>}/>
      </Routes>
    </div>
  );
}

export default App;
