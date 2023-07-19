import { useEffect, useRef, useState } from 'react';
import { ResModel, fetcher } from '../../../network/api';
import Cache from '../SearchDataCache';

type UseGetSearchResModel = {
  sickCd: string;
  sickNm: string;
};

function useGetSearch() {
  const apiCnt = useRef(0);
  const cache = useRef(new Cache());
  const [selectOptions, setSelectOptions] = useState<
    Array<UseGetSearchResModel>
  >([]);

  const requestSick = async (value: string) => {
    const isCached = cache.current.isCached(value);
    const isDBData = cache.current.getIsDBData;
    if (isDBData && isCached) {
      setSelectOptions(cache.current.getValue(value));
      return;
    }
    apiCnt.current++;

    // eslint-disable-next-line no-console
    console.info(`calling api, call count: ${apiCnt.current}`);
    const response: ResModel<Array<UseGetSearchResModel>> = await fetcher({
      url: '/sick',
      method: 'GET',
      params: {
        q: value,
      },
    });
    const { status, data, isSuccess } = response;

    if (status === 200 && isSuccess) {
      cache.current.setCache(value, data);
      setSelectOptions(cache.current.getValue(value));
    }
  };

  useEffect(() => {
    const unmountCache = cache.current.mountCache({
      searchValueExpiredMS: 30000,
      mappingExpiredMS: 180000,
      dbDataExpiredMS: 300000,
    });

    requestSick('');

    return () => {
      unmountCache();
    };
  }, []);

  return {
    selectOptions,
    requestSick,
  };
}

export type { UseGetSearchResModel };
export default useGetSearch;
