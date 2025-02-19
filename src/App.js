import { Route, Routes } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Login from './pages/Login/index.tsx';
import Signup from './pages/Signup/index.tsx';
import Home from './pages/Home/index.tsx';
import SearchResult from './pages/SearchResult/index.tsx';
import BrandDetail from './pages/BrandDetail/index.tsx';
import PerfumeDetail from './pages/PerfumeDetail/index.tsx';
import MyPage from './pages/MyPage/index.tsx';
import MyCollection from './pages/MyCollection';
import ChangePassword from './pages/ChangePassword/index.tsx';
import WriteReview from './pages/WriteReview';
import SearchByNote from './pages/SearchByNote';
import KeywordSearchStep1 from './pages/KeywordSearch/KeywordSearchStep1/index.tsx';
import KeywordSearchStep2 from './pages/KeywordSearch/KeywordSearchStep2/index.tsx';
import RecommendResult from './pages/RecommendResult';
import Commmunity from './pages/Community';
import CommunityWrite from './pages/CommunityWrite';
import CommunityDetail from './pages/CommunityDetail';
import MyBoards from './pages/MyBoards';
import MyComments from './pages/MyComments';
import Notice from './pages/Notice';
import AddBrand from './pages/Admin/AddBrand';
import AddPerfume from './pages/Admin/AddPerfume';
import AddPerfumeScent from './pages/Admin/AddPerfumeScent';
import NotFound from './pages/NotFound';
import FindPassword from './pages/FindPassword';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/findpassword" element={<FindPassword />} />
        <Route path="/searchresult" element={<SearchResult />} />
        <Route path="/branddetail" element={<BrandDetail />} />
        <Route path="/perfumedetail" element={<PerfumeDetail />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mycollection" element={<MyCollection />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="/writereview" element={<WriteReview />} />
        <Route path="/searchbynote" element={<SearchByNote />} />
        <Route path="/keywordsearchstep1" element={<KeywordSearchStep1 />} />
        <Route path="/keywordsearchstep2" element={<KeywordSearchStep2 />} />
        <Route path="/recommendresult" element={<RecommendResult />} />
        <Route path="/perfumedetail" element={<PerfumeDetail />} />
        <Route path="/myboards" element={<MyBoards />} />
        <Route path="/mycomments" element={<MyComments />} />
        <Route path="/writereview" element={<WriteReview />} />
        <Route path="/community" element={<Commmunity />} />
        <Route path="/communitywrite" element={<CommunityWrite />} />
        <Route path="/communitydetail" element={<CommunityDetail />} />
        <Route path="/notice" element={<Notice />} />
        <Route path="/admin/addbrand" element={<AddBrand />} />
        <Route path="/admin/addPerfume" element={<AddPerfume />} />
        <Route path="/admin/addperfumescent" element={<AddPerfumeScent />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
