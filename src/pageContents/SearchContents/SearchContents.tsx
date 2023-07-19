import { useEffect, useRef } from 'react';

import type { UseGetSearchResModel } from '../../pages/Search/hooks/useGetSearch';

import ClickAwayListener from '../../components/ClickAwayListener/ClickAwayListener';

import classNames from 'classnames/bind';
import style from './style.module.scss';
const cx = classNames.bind(style);

type Props = {
  inputValue: string;
  options: Array<UseGetSearchResModel>;
  isOpenPopup: boolean;
  optionHover: number;
  handleKeyboard: (e: React.KeyboardEvent) => void;
  onClickAway: () => void;
  onClickInput: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: (value: string) => void;
};

function SearchContents({
  inputValue,
  options,
  isOpenPopup,
  optionHover,
  handleKeyboard,
  onClickAway,
  onClickInput,
  onChange,
  onSearch,
}: Props) {
  const optionsRef = useRef<HTMLDivElement>(null);

  const scrollTo = () => {
    if (optionHover >= 0 && optionsRef.current) {
      const box = optionsRef.current;
      if (!box.childNodes[optionHover]) return;
      const element = box.childNodes[optionHover] as HTMLDivElement;
      const { height: eleHeight } = element.getBoundingClientRect();
      const top = eleHeight * optionHover;
      box.scrollTo({
        top,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    scrollTo();
  }, [optionHover]);

  return (
    <div className={cx('container')} onKeyDown={handleKeyboard}>
      <h1 className={cx('title')}>검색 자동완성 기능 구현 과제</h1>
      <ClickAwayListener onClickAway={onClickAway}>
        <div className={cx('contents')}>
          <input
            className={cx('input')}
            value={inputValue}
            placeholder='질환명을 입력해주세요.'
            onClick={onClickInput}
            onChange={onChange}
          ></input>
          <div
            ref={optionsRef}
            className={cx(
              'options',
              isOpenPopup && 'open',
              options.length === 0 && 'no-data',
            )}
          >
            {options.length === 0 && <div>검색어 없음</div>}
            {options.length > 0 &&
              options.map(({ sickCd, sickNm }, idx) => {
                const hover = optionHover === idx;
                return (
                  <div
                    key={sickCd}
                    className={cx('option-item', { hover })}
                    onClick={() => {
                      onSearch(sickNm);
                    }}
                  >
                    {sickNm}
                  </div>
                );
              })}
          </div>
        </div>
      </ClickAwayListener>
    </div>
  );
}

export default SearchContents;
