# 🎬 OZFLIX - 영화 검색 및 찜 서비스

Supabase와 TMDB API를 활용하여 제작한 영화 정보 제공 웹앱입니다. 디바운스 검색, 무한 스크롤, 반응형 UI, 소셜 로그인 등 다양한 프론트엔드 기술을 실습하고 적용한 프로젝트입니다.

배포 링크 👉 [https://ozflix.vercel.app](https://ozflix.vercel.app)

---

## ✅ 주요 기능

### 1. 🔍 디바운스 검색창
- 사용자의 입력이 멈춘 후에만 API 요청을 보내는 디바운스 기능 적용
- 불필요한 요청 최소화 및 성능 개선

### 2. ♾️ 무한 스크롤 (스로틀링 적용)
- 커스텀 훅 `hooks/useInfiniteMovies.js`에서 스로틀링을 활용
- 스크롤 하단 도달 시 다음 페이지 자동 로딩

### 3. 📱 반응형 디테일 페이지 구현
- **데스크톱**: 백드롭 이미지 블러 처리 + 포스터 이미지 함께 표시
- **모바일**: 백드롭 이미지는 선명하게, 포스터 이미지는 숨겨서 가독성 향상

### 4. 👤 마이페이지
- 로그인한 유저 별로 찜한 영화만 출력되는 개인화 페이지 구현

### 5. 💖 찜 기능
- 커스텀 훅으로 찜/찜 해제 기능 구현
- Supabase와 연동하여 유저별 찜 목록 저장 및 관리

### 6. 🚫 성인 영화 필터링
- TMDB API 응답 중 성인 등급(`adult`) 영화는 자동으로 필터링하여 표시하지 않음
- `adult`로 필터링 되지 않는 영화는 `blockkeyword`로 한번 더 필터링

### 7. 🔐 Supabase 로그인/소셜 로그인
- 기본 이메일 로그인 구현
- 카카오/구글/깃허브 소셜 로그인 연동
- 소셜 로그인 시 유저 이름과 프로필 썸네일도 함께 출력

---

## 🛠 사용 기술 스택

- **React (Vite 기반)**
- **Tailwind CSS**
- **Supabase (Auth, DB)**
- **TMDB API**
- **React Router Dom v6**
- **react-icons**
- **Axios**

---

---

## 🔍 SearchPage 카드 클릭 오류 해결

### 📌 문제

- `/search` 경로에서 `MovieCard`를 클릭해도 `MovieDetail` 페이지로 이동하지 않는 문제가 있었습니다.
- 이는 `react-router-dom`이 `location.search`만 바뀐 경우 컴포넌트를 재마운트하지 않기 때문입니다.

### ✅ 해결

```jsx
AppRouter.jsx

import { useLocation } from 'react-router-dom';
...

<Route path="/search" element={<SearchResults key={location.search} />} />
```
- location.search를 key로 주면, 검색어가 바뀔 때마다 SearchResults 컴포넌트가 새로 마운트됩니다.
- 이로 인해 useEffect가 재실행되고, MovieCard 클릭 이벤트도 정상 작동하게 되었습니다.

> ✔️ replace: true도 함께 사용해 히스토리 스택 누적을 방지하여 UX를 개선했습니다.
```jsx
components/NavBar.jsx

navigate(
  `/search?query=${encodeURIComponent(search)}&type=${searchType}`,
  { replace: true }
);
```

---

## 📁 폴더 구조

```
📦src
 ┣ 📂components         # 공통 UI 컴포넌트
 ┣ 📂hooks              # 커스텀 훅 모음
 ┣ 📂pages              # 라우터별 페이지 컴포넌트
 ┣ 📂context            # 테마 전역함수
 ┣ 📂store              # 상태관리 (Zustand 등)
 ┣ 📂utils              # 유틸 함수
 ┗ 📜main.jsx           # 앱 엔트리 포인트
```

---

## 🙋🏻‍♀️ 사용자가 로그인하면?

- Supabase에서 사용자 정보를 불러옵니다.
- Zustand 전역 상태로 로그인 상태를 저장합니다.
- 사용자 메뉴에서 로그아웃 및 마이페이지 진입이 가능해집니다.

---

## ✨ 프로젝트를 통해 느낀 점

이번 프로젝트에서는 단순한 영화 조회 기능을 넘어서, 실제 사용자 경험을 고려한 **디바운스/무한스크롤**, **반응형 UI 설계**, **유저별 개인화된 데이터 표시**, **소셜 로그인 연동** 등을 처음부터 끝까지 구현해보며 실력을 한층 더 끌어올릴 수 있었습니다.

특히 마이페이지에서 유저별 찜 목록이 동작할 때 Supabase와의 연동을 성공했을 때 큰 성취감을 느꼈습니다. 또한 모바일과 데스크톱을 각각 다르게 구성한 디테일 페이지는 실제 사용자 관점에서 어떤 화면이 더 편할지를 고민하며 설계한 결과물이라 의미가 컸습니다.

혼자서 처음부터 배포까지 구현하며 부족한 점도 많이 발견했지만, 그만큼 성장도 확실히 체감할 수 있었던 값진 경험이었습니다.

---

읽어주셔서 감사합니다! 
