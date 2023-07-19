# 원티드 프리온보딩 인턴십 4주차 과제

### 프로젝트 실행

- client

```
git clone https://github.com/KMJ192/pre-onboarding-11th-4
npm install
npm run start
```

- server

```
git clone https://github.com/walking-sunset/assignment-api.git
npm install
npm start
```

### 구현 목표

- 검색 기능
  - 검색창에 문자열이 입력될때 마다 api 호출하여 필터링 된 문자열을 받아 리스트로 출력
  - 캐싱 기능을 구현하여 API 호출을 줄임
- 키보드 이동 기능
  - 키보드를 이용하여 리스트를 선택할 수 있어야 함

### 캐싱

##### 캐싱할 데이터

- 검색창에 입력되는 문자열
- 문자열과 매핑되는 응답 값의 key값
- 서버에서 내려주는 응값 값(DB 데이터)

##### 캐싱 전략 및 구현방법

- 검색창에 입력되는 문자열은 다시 사용될 가능성이 크지 않을 것으로 예상
- DB의 데이터는 업데이트 주기가 상대적으로 낮을 것으로 예상
- 따라서 검색창에 입력되는 문자열에 대한 응답값도 업데이트 주기가 낮을 것으로 예상
- 따라서 각 데이터별 만료 시간은 아래와 같음
  1. **입력 받은 문자열 30초**
  2. **문자열과 매핑된 응답 데이터 3분**
  3. **DB 데이터 5분**
- 1번(입력받은 문자열)은 검색창에 입력이 될 때 마다 만료시간을 검사
- 2번(문자열과 매핑된 응답데이터)과 3번(DB 데이터)은 주기적으로 만료시간을 검사하고 갱신
- SearchDataCache 클래스를 이용하여 데이터 캐싱 구현
- 인메모리에 객체 형식으로 캐시 데이터 저장
- 컴포넌트 마운트 시 캐시 만료시간 설정 및 데이터 캐싱

### 키보드 이동

- 키보드의 Arrow 이벤트가 발생할 때 마다 인덱싱
- 인덱싱 된 위치로 스크롤 이동
- Enter 이벤트가 발생하면 인덱싱 된 요소가 선택되도록 설정
- 인덱싱이 될 때 마다 스크롤의 위치를 계산하여 스크롤이 이동하도록 설정

### 폴더 구조

```
root /
├ public
|  ├ vite.svg
├ src
|  ├ assets
|  |  ├ react.svg
|  ├ components
|  |  ├ ClickAwayListener
|  |  |  ├ ClickAwayListener.tsx
|  |  ├ ErrorBoundary
|  |  |  ├ ErrorBoundary.tsx
|  ├ network
|  |  ├ api.ts
|  ├ pageContents
|  |  ├ SearchContents
|  |  |  ├ SearchContents.tsx
|  |  |  ├ style.module.scss
|  ├ pages
|  |  ├ Error
|  |  |  ├ Error.tsx
|  |  |  ├ NotFound.tsx
|  |  |  ├ style.module.scss
|  |  ├ Index
|  |  |  ├ Index.tsx
|  |  ├ Search
|  |  |  ├ hooks
|  |  |  |  ├ useGetSearch.ts
|  |  |  |  ├ useSearchPageState.ts
|  |  |  ├ Search.tsx
|  |  |  ├ SearchDataCache.ts
|  |  ├ index.ts
|  ├ RootRouter
|  |  ├ RootRouter.tsx
|  |  ├ RouterMap.tsx
|  |  ├ url.ts
|  ├ App.tsx
|  ├ index.css
|  ├ main.tsx
|  ├ vite-env.d.ts
├ .eslintrc.json
├ .gitignore
├ .prettierrc
├ index.html
├ package-lock.json
├ package.json
├ README.md
├ tsconfig.json
├ tsconfig.node.json
⎿ vite.config.ts
```
