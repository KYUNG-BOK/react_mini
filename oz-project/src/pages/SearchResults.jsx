import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import {
  parseEnvKeywords,
  parseEnvKeywordPairs,
  filterMovies
} from '../utils/filterMovies';

import { useTheme } from '../context/ThemeContext';
import SearchCard from '../components/SearchCard';
import useDebounce from '../hooks/useDebounce';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BANNED_KEYWORDS = parseEnvKeywords(import.meta.env.VITE_BANNED_KEYWORDS);
const BANNED_PAIRS = parseEnvKeywordPairs(import.meta.env.VITE_BANNED_KEYWORD_PAIRS);

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchResults() {
  const query = useQuery().get('query') || '';
  const type = useQuery().get('type') || 'title';
  const debounceQuery = useDebounce(query, 500);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    if (!debounceQuery.trim()) {
      setResults([]);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);

        if (type === 'actor') {
          const searchRes = await axios.get(
            `https://api.themoviedb.org/3/search/person?api_key=${API_KEY}&query=${encodeURIComponent(
              debounceQuery
            )}&language=ko-KR`
          );

          const persons = searchRes.data.results || [];

          if (persons.length === 0) {
            setResults([]);
            setLoading(false);
            return;
          }

          const actorId = persons[0].id;
          const creditsRes = await axios.get(
            `https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=${API_KEY}&language=ko-KR`
          );
          const movies = creditsRes.data.cast || [];

          setResults(filterMovies(movies, BANNED_KEYWORDS, BANNED_PAIRS));
        } else {
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
  }, [debounceQuery, type]);

  const bgClass = theme === 'light' ? 'bg-white text-black' : 'bg-black text-white';
  const cardBgClass = theme === 'light' ? 'bg-gray-300' : 'bg-gray-800';
  const textGrayClass = theme === 'light' ? 'text-gray-700' : 'text-gray-400';

  return (
    <div className={`${bgClass} min-h-screen p-10`}>
      <h2 className="text-3xl mb-6">🔍 "{query}" 검색 결과</h2>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p>로딩 중...</p>
        ) : (
          results.map((movie) => (
            <SearchCard
              key={movie.id}
              movie={movie}
              cardBgClass={cardBgClass}
              textGrayClass={textGrayClass}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default SearchResults;
