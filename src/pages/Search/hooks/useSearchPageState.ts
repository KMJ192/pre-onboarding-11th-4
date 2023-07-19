import { useState } from 'react';

type SearchPageState = {
  isOpenPopup: boolean;
  inputValue: string;
  optionHover: number;
  setIsOpenPopup: (nextState: boolean) => void;
  setInputValue: (nextState: string) => void;
  setOptionHover: (nextState: number) => void;
  updateState: (
    nextState: Pick<
      SearchPageState,
      'inputValue' | 'isOpenPopup' | 'optionHover'
    >,
  ) => void;
};

function useSearchPageState(): SearchPageState {
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [optionHover, setOptionHover] = useState(-1);

  const setIOP = (nextState: boolean) => {
    setIsOpenPopup(nextState);
  };

  const setIV = (nextState: string) => {
    setInputValue(nextState);
  };

  const setOH = (nextState: number) => {
    setOptionHover(nextState);
  };

  const updateState = (
    nextState: Pick<
      SearchPageState,
      'inputValue' | 'isOpenPopup' | 'optionHover'
    >,
  ) => {
    const { inputValue, isOpenPopup, optionHover } = nextState;

    setInputValue(inputValue);
    setIsOpenPopup(isOpenPopup);
    setOptionHover(optionHover);
  };

  return {
    isOpenPopup,
    inputValue,
    optionHover,
    setIsOpenPopup: setIOP,
    setInputValue: setIV,
    setOptionHover: setOH,
    updateState,
  };
}

export default useSearchPageState;
