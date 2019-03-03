import React, { useState, useEffect } from 'react';
import cx from 'classnames';

import usePostClaps from '../../hooks/usePostClaps';

import StarButton from './StarButton';

import s from './ArticleActions.module.scss';

type Props = {
  postid: string
};

const ArticleActions = React.memo(({ postid }: Props) => {
  const postClapData = usePostClaps(postid);

  return (
    <div>
      <div className={s.topbar}>
        <StarButton
          {...postClapData}
        />
      </div>

      <div className={s.bottomBar}>
        <StarButton
          {...postClapData}
          className={s.clapperBtnBottomBar}
        />
      </div>
    </div>
  );
});

export default ArticleActions;
