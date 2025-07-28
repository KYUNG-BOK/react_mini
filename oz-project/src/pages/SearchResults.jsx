import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import useDebounce from '../hooks/useDebounce';
import { parseEnvKeywords, parseEnvKeywordPairs, filterMovies } from '../utils/filterMovies';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BANNED_KEYWORDS = parseEnvKeywords(import.meta.env.VITE_BANNED_KEYWORDS);
const BANNED_PAIRS = parseEnvKeywordPairs(import.meta.env.VITE_BANNED_KEYWORD_PAIRS);

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchResults() {
  const query = useQuery().get('query');
  // 확장중입니다. 영화명/배우/장르 분기검색 구현을 위한...
  const type = useQuery().get('type');
  const debounceQuery = useDebounce(query, 500); //500ms 디바운스 적용
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!debounceQuery) {
      setResults([]);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);

        if (type === 'actor') {
          // 1. 배우 검색으로 배우 리스트 가져오기
          const searchRes = await axios.get(
            `https://api.themoviedb.org/3/search/person?api_key=${API_KEY}&query=${encodeURIComponent(
              debounceQuery
            )}&language=ko-KR`
          );
          const persons = searchRes.data.results || [];

          if (persons.length === 0) {
            // 배우가 없으면
            setResults([]); // 결과 초기화
            setLoading(false); // 로딩도 false
            return; // 종료
          }

          // 2. 배우 ID로 전체 출연작 가져오기
          const actorId = persons[0].id;
          const creditsRes = await axios.get(
            `https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=${API_KEY}&language=ko-KR`
          );
          const movies = creditsRes.data.cast || [];

          // 3. 성인 영화 제외하고 결과 세팅
          setResults(filterMovies(movies, BANNED_KEYWORDS, BANNED_PAIRS));
        } else {
          // 기본 영화 검색
          const res = await axios.get(
            `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
              debounceQuery
            )}&language=ko-KR&include_adult=false`
          );
          setResults(filterMovies(res.data.results, BANNED_KEYWORDS, BANNED_PAIRS));
        }
        setLoading(false);
      } catch (error) {
        console.error('검색 중 오류 발생:', error);
        setResults([]);
        setLoading(false);
      }
    };

    fetchData();
  }, [debounceQuery, type]); // 디바운스 된 검색어 / 검색 타입이 바뀔때마다 재실행하기

  return (
    <div className="min-h-screen bg-black p-10 text-white">
      <h2 className="text-3xl mb-6">🔍 "{query}" 검색 결과</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {loading ? (
          <p>로딩 중...</p>
        ) : (
          results.map((movie) => (
            <div key={movie.id} className="bg-gray-800 p-4 rounded-lg">
              <Link to={`/details/${movie.id}`}>
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                      : '/default-poster.png'
                  }
                  alt={movie.title || movie.name}
                  className="w-full h-auto object-cover rounded"
                />
                <h3 className="mt-2 text-xl">{movie.title || movie.name}</h3>
                <p className="text-sm text-gray-400">
                  {/* 출시연도, 첫 방송 연도 없으면 N/A */}
                  {movie.release_date
                    ? movie.release_date.slice(0, 4)
                    : movie.first_air_date
                    ? movie.first_air_date.slice(0, 4)
                    : 'N/A'}
                </p>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default SearchResults;
