import React, { useState, useEffect } from 'react';
import cx from 'classnames';

import s from './StarButton.module.scss';

type Variation = 'fab'|'mini';

type StarButtonProps = {
  myClaps: number
  totalClaps: number
  clap: (e: any) => any
  isOverLimit: boolean
  isLoading: boolean
  className?: string
  variation: Variation
};

const getClass = (variation: Variation) => ({
  mini: s.variationMini,
  fab: s.variationFab,
})[variation];

const StarButton = React.memo(({ myClaps, totalClaps, clap, isOverLimit, isLoading, className, variation = 'mini', ...props }: StarButtonProps) => {
  const [ isDiffVisible, setDiffVisibility ] = useState(false);

  useEffect(() => {
    if (myClaps === 0) return () => {};
    setDiffVisibility(true);
    const timer = setTimeout(() => setDiffVisibility(false), 1000);
    return () => clearTimeout(timer);
  }, [myClaps]);

  return (
    <button
      className={cx(s.clapperBtn, { [s.overLimit]: isOverLimit }, getClass(variation), className)}
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
