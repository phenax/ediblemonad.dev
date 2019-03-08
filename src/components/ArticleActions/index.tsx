import React from 'react';

import usePostClaps from '../../hooks/usePostClaps';

import StarButton from './StarButton';

import s from './ArticleActions.module.scss';

interface Props {
  postid: string
  summary: string
  link: string
};

const ArticleActions = React.memo(({ postid, summary, link }: Props) => {
  const postClapData = usePostClaps(postid);

  const tweet = `${summary} by Akshay Nair ${link}`;
  const twitterLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet)}`;

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
        <a href={twitterLink} className={s.shareLink} target="_blank _parent" rel="noopener">
          <i className="fab fa-twitter" />
          Share on twitter
        </a>
      </div>
    </div>
  );
});

export default ArticleActions;
