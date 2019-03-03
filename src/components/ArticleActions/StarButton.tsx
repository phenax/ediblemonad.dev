import React, { useState, useEffect } from 'react';
import cx from 'classnames';

import s from './StarButton.module.scss';

type StarButtonProps = {
  myClaps: number
  totalClaps: number
  clap: (e: any) => any
  isOverLimit: boolean
  isLoading: boolean
  className?: string
};

const StarButton = React.memo(({ myClaps, totalClaps, clap, isOverLimit, isLoading, className, ...props }: StarButtonProps) => {
  const [ isDiffVisible, setDiffVisibility ] = useState(false);

  useEffect(() => {
    if (myClaps === 0) return () => {};
    setDiffVisibility(true);
    const timer = setTimeout(() => setDiffVisibility(false), 1000);
    return () => clearTimeout(timer);
  }, [myClaps]);

  return (
    <button
      className={cx(s.clapperBtn, className, { [s.overLimit]: isOverLimit })}
      onClick={clap}
      disabled={isOverLimit}
      {...props}
    >
      <span><i className="fas fa-star" /></span>

      <div className={cx(s.userCount, { [s.userCountShow]: isDiffVisible })}>
        +{myClaps}
      </div>

      <div className={s.totalCount}>{isLoading ? '--' : totalClaps}</div>
    </button>
  );
});

export default StarButton;
