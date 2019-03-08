import React from 'react';

import usePostClaps from '../../hooks/usePostClaps';

import StarButton from './StarButton';

import s from './ArticleActions.module.scss';

type Props = {
  postid: string
};

const ArticleActions = React.memo(({ postid }: Props) => {
  const postClapData = usePostClaps(postid);

  const twitterLink = 'https://twitter.com/intent/tweet?text=Writing%20cleaner%20and%20safer%20JavaScript%20with%20Sum%20Types%20by%20Akshay%20Nair%20https%3A%2F%2Flink.medium.com%2FyL2W9MMlTU';

  return (
    <div>
      <div className={s.topbar}>
        <StarButton
          {...postClapData}
          variation="fab"
        />
      </div>

      <div className={s.bottomBar}>
        <StarButton
          {...postClapData}
          variation="mini"
          className={s.clapperBtnBottomBar}
        />
        <a href={twitterLink} className={s.shareLink}>
          <i className="fab fa-twitter" />
          Share on twitter
        </a>
      </div>
    </div>
  );
});

export default ArticleActions;
