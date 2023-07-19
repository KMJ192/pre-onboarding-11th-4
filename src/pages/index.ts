import { lazy } from 'react';

const _Index = import('./Index/Index');
const _Search = import('./Search/Search');
const _Error = import('./Error/Error');
const _NotFound = import('./Error/NotFound');

const Index = lazy(() => _Index);
const Search = lazy(() => _Search);
const Error = lazy(() => _Error);
const NotFound = lazy(() => _NotFound);

export { Index, Search, Error, NotFound };
