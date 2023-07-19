import classNames from 'classnames/bind';
import style from './style.module.scss';
const cx = classNames.bind(style);

function Error() {
  return <div className={cx('error')}>500 Error</div>;
}

export default Error;
