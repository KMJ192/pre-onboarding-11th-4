import type { UseGetSearchResModel } from './hooks/useGetSearch';

type DBData = {
  [key: string]: string;
};

type CacheData = Map<string, [number, Array<string>]>;

class Cache {
  private dbData: DBData;

  private searchValueExpiredMS: number;

  private cacheData: CacheData;

  private isDBData: boolean;

  constructor() {
    this.dbData = {};

    this.searchValueExpiredMS = 0;

    this.cacheData = new Map();

    this.isDBData = false;
  }

  private clearExpired() {
    const newCacheData: CacheData = new Map();
    this.cacheData.forEach((cache, key) => {
      if (Date.now() < cache[0]) {
        newCacheData.set(key, cache);
      }
    });

    this.cacheData = newCacheData;
  }

  private clearDBData() {
    this.dbData = {};
    this.isDBData = false;
  }

  public isCached(value: string): boolean {
    if (this.cacheData.has(value)) {
      return true;
    }
    return false;
  }

  public setCache(value: string, resData: Array<UseGetSearchResModel>) {
    const cacheValue: Array<string> = [];

    resData.forEach(({ sickCd, sickNm }) => {
      cacheValue.push(sickCd);
      this.dbData[sickCd] = sickNm;
    });
    this.isDBData = true;

    this.cacheData.set(value, [
      Date.now() + this.searchValueExpiredMS,
      cacheValue,
    ]);
  }

  public mountCache({
    searchValueExpiredMS,
    mappingExpiredMS,
    dbDataExpiredMS,
  }: {
    searchValueExpiredMS: number;
    mappingExpiredMS: number;
    dbDataExpiredMS: number;
  }) {
    this.searchValueExpiredMS = searchValueExpiredMS;
    const dbInterval = setInterval(() => {
      this.clearDBData();
    }, dbDataExpiredMS);
    const searchValueInterval = setInterval(() => {
      this.clearExpired();
    }, mappingExpiredMS);

    return () => {
      clearInterval(dbInterval);
      clearInterval(searchValueInterval);
    };
  }

  public getValue(value: string) {
    if (this.cacheData.has(value)) {
      const keyArray = this.cacheData.get(value)?.[1];
      if (Array.isArray(keyArray)) {
        const value: Array<UseGetSearchResModel> = [];
        keyArray.forEach((key) => {
          if (this.dbData[key]) {
            value.push({
              sickCd: key,
              sickNm: this.dbData[key],
            });
          }
        });

        return value;
      }
    }

    return [];
  }

  get getIsDBData() {
    return this.isDBData;
  }
}

export default Cache;
