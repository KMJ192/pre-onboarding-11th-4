import classNames from 'classnames/bind';
import style from './style.module.scss';
const cx = classNames.bind(style);

function NotFound() {
  return <div className={cx('error')}>페이지를 찾을 수 없습니다.</div>;
}

export default NotFound;
