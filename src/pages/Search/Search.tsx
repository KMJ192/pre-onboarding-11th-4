import useGetSearch from './hooks/useGetSearch';
import SearchContents from '../../pageContents/SearchContents/SearchContents';
import useSearchPageState from './hooks/useSearchPageState';

function Search() {
  const {
    isOpenPopup,
    inputValue,
    optionHover,
    setIsOpenPopup,
    setInputValue,
    setOptionHover,
    updateState,
  } = useSearchPageState();
  const { requestSick, selectOptions } = useGetSearch();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    updateState({
      isOpenPopup: true,
      inputValue: value,
      optionHover: 0,
    });
    requestSick(value);
  };

  const onClickInput = () => {
    setIsOpenPopup(true);
  };

  const onSearch = (value: string) => {
    setIsOpenPopup(false);
    setInputValue(value);
    requestSick(value);
  };

  const onClickAway = () => {
    setIsOpenPopup(false);
  };

  const handleKeyboard = (e: React.KeyboardEvent) => {
    e.stopPropagation();

    const len = selectOptions.length;
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      setIsOpenPopup(true);
    }

    if (e.key === 'ArrowDown') {
      let next = optionHover === -1 ? 0 : optionHover + 1;
      if (next >= len) {
        next = 0;
      }
      setOptionHover(next);
      return;
    }
    if (e.key === 'ArrowUp') {
      let next = optionHover - 1;
      if (next < 0) {
        next = len - 1;
      }
      setOptionHover(next);
      return;
    }
    if (e.key === 'Enter') {
      onSearch(selectOptions[optionHover].sickNm);
    }
  };

  return (
    <SearchContents
      isOpenPopup={isOpenPopup}
      inputValue={inputValue}
      options={selectOptions}
      optionHover={optionHover}
      handleKeyboard={handleKeyboard}
      onClickInput={onClickInput}
      onClickAway={onClickAway}
      onChange={onChange}
      onSearch={onSearch}
    />
  );
}

export default Search;
