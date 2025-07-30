import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import App from './pages/App';
import MovieDetail from './pages/MovieDetail';
import SearchResults from './pages/SearchResults';
import NotFound from './pages/NotFound';
import WishList from './pages/WishList';
import MyPageLayout from './components/MyPageLayout';
import UserInfo from './components/UserInfo';

export default function AppRouter() {
  const location = useLocation();

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<App />} />
        <Route path="/details/:id" element={<MovieDetail />} />
        <Route path="/search" element={<SearchResults key={location.search} />} />

        {/* MyPage 중첩 라우트 */}
        <Route path="/mypage" element={<MyPageLayout />}>
          <Route index element={<UserInfo />} />
          <Route path="wishlist" element={<WishList />} />
        </Route>

        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
