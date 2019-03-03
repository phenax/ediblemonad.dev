import React, { useState, useEffect, useRef } from 'react';
import cx from 'classnames';

import { getPost, clapper, CLAP_LIMIT } from '../../helpers/firebase';

import s from './Clapper.module.scss';

type Props = {
  postid: string
};

const useFirebasePostClaps = (postid: string) => {
  const [clapCount, setClapCount] = useState(0);
  const postRef = useRef<null|firebase.firestore.DocumentReference>(null);

  useEffect(() => {
    postRef.current = getPost(postid);

    return postRef.current.onSnapshot(post => {
      const { claps = 0 } = post.data() || {};
      setClapCount(claps);
    });
  }, [postid]);

  const clap = () => {
    if (postRef.current) {
      clapper.setTotalClaps(postRef.current, clapCount + 1);
    }
  };

  return [ clapCount, clap ];
};

const usePostClaps = (postid: string) => {
  const [totalClaps, setTotalClaps] = useFirebasePostClaps(postid);
  const [userClapCount, setUserClapCount] = useState(0);

  useEffect(() => {
    setUserClapCount(clapper.userClaps(postid));
  }, [postid]);

  const clap = () => {
    const userClaps = clapper.userClaps(postid);

    if (userClaps !== userClapCount)
      setUserClapCount(userClaps);

    if (userClaps < CLAP_LIMIT) {
      (setTotalClaps as Function)();
      setUserClapCount(userClaps + 1);
      clapper.setUserClaps(postid, userClaps + 1);
    }
  };

  return {
    myClaps: userClapCount,
    totalClaps: +totalClaps,
    clap,
    isOverLimit: userClapCount >= CLAP_LIMIT,
    isLoading: userClapCount > totalClaps && totalClaps === 0,
  };
};


type ClapperButtonProps = {
  myClaps: number
  totalClaps: number
  clap: (e: any) => any
  isOverLimit: boolean
  isLoading: boolean
  className?: string
};

const ClapperButton = React.memo(({ myClaps, totalClaps, clap, isOverLimit, isLoading, className, ...props }: ClapperButtonProps) => {
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
      {isLoading ? '--' : totalClaps}

      <div className={cx(s.userCount, { [s.userCountShow]: isDiffVisible })}>
        +{myClaps}
      </div>
    </button>
  );
});

const Clapper = React.memo(({ postid }: Props) => {
  const postClapData = usePostClaps(postid);
  const { isOverLimit } = postClapData;

  return (
    <div>
      <div className={s.topbar}>
        <ClapperButton
          {...postClapData}
          className={s.clapperBtnTop}
        />
      </div>

      <div className={s.bottomBar}>
        <ClapperButton
          {...postClapData}
        />
      </div>
    </div>
  );
});

export default Clapper;
