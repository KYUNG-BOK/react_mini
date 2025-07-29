import React from 'react';
import { FiSearch } from 'react-icons/fi';

export default function SearchBar({
  search,
  onSearchChange,
  onSearchSubmit,
  searchType,
  onSearchTypeChange,
  inputBgClass,
  selectBgClass,
}) {
  return (
    <form onSubmit={onSearchSubmit} className="w-full sm:flex-grow sm:mx-6">
      <div
        className="
          relative flex 
          flex-col-reverse sm:flex-row 
          items-stretch sm:items-center 
          space-y-4 sm:space-y-0 sm:space-x-3
          sm:gap-0.5
          max-w-full sm:max-w-4xl 
          mx-auto"
      >
        <div className="relative flex-grow mb-0">
          <FiSearch
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            value={search}
            onChange={onSearchChange}
            placeholder={
              searchType === 'title'
                ? '영화명을 입력하세요.'
                : '출연 배우를 입력하세요.'
            }
            className={`w-full pl-10 pr-4 py-2 text-base sm:text-xl rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${inputBgClass}`}
          />
        </div>

        <select
          value={searchType}
          onChange={onSearchTypeChange}
          className={`py-2 sm:py-3 px-3 rounded-md text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-red-500 mt-0 sm:mt-auto ${selectBgClass}`}
        >
          <option value="title">영화 제목</option>
          <option value="actor">출연 배우</option>
        </select>
      </div>
    </form>
  );
}
