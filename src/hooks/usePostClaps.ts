import { useState, useEffect, useRef } from 'react';

import useFirebasePostClaps from './useFirebasePostClaps';
import { clapper, CLAP_LIMIT } from '../helpers/firebase';

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

export default usePostClaps;
