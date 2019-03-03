import { useState, useEffect, useRef } from 'react';

import { getPost, clapper } from '../helpers/firebase';

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

export default useFirebasePostClaps;
