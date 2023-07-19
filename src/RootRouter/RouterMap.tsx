import React from 'react';

import URL from './url';
import { Index, Search } from '../pages';

type RouterMap = {
  key: string;
  path: string;
  page: React.ReactNode;
};

const routerMap: Array<RouterMap> = [
  {
    key: 'index',
    path: URL.index,
    page: <Index />,
  },
  {
    key: 'search',
    path: URL.search,
    page: <Search />,
  },
];

export type { RouterMap };
export { routerMap };
