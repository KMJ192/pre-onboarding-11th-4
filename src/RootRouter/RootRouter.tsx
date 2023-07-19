import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import { routerMap } from './RouterMap';
import { Error, NotFound } from '../pages';

function RootRouter() {
  return (
    <ErrorBoundary fallback={<Error />}>
      <BrowserRouter>
        <Routes>
          {routerMap.map(({ key, path, page }) => {
            return <Route key={key} path={path} element={page}></Route>;
          })}
          <Route path='*' element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default RootRouter;
