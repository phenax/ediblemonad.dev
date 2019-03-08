import *  as firebase from 'firebase/app';
import 'firebase/firestore';

firebase.initializeApp({
  apiKey: process.env.GATSBY_FIREBASE_APIKEY,
  authDomain: process.env.GATSBY_FIREBASE_AUTHDOMAIN,
  projectId: process.env.GATSBY_FIREBASE_FIRESTORE_ID,
});

export const store = firebase.firestore();
export const blogs = store.collection('blogs');
export const getPost = (postid: string) => blogs.doc(postid);


export const CLAP_LIMIT = 50;

export const clapper = {
  totalClaps: async (postRef: firebase.firestore.DocumentReference): Promise<number> => ((await postRef.get()).data() || {}).claps || 0,
  setTotalClaps: async (postRef: firebase.firestore.DocumentReference, claps: number) => postRef.set({ claps }),

  userClaps(postid: string) {
    const claps = localStorage.getItem(`cc_${postid}`) || 0;
    return parseInt(`${claps}`, 10);
  },
  setUserClaps: (postid: string, claps: number) =>  localStorage.setItem(`cc_${postid}`, `${claps}`),

  async clap(postid: string) {
    const postRef = getPost(postid);
    const claps = await clapper.totalClaps(postRef);

    const userClaps = clapper.userClaps(postid);
  
    // Cap total number of claps allowed
    if (userClaps >= CLAP_LIMIT) return false;
  
    // Update total number of claps
    await clapper.setTotalClaps(postRef, +claps + 1);
  
    // Update current users claps
    clapper.setUserClaps(postid, userClaps + 1);
  
    return true;
  },
};

export default firebase;
