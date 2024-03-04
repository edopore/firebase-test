// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithRedirect,
  signOut,
} from 'firebase/auth';

import { GoogleAuthProvider } from 'firebase/auth';
import {
  getFirestore,
  addDoc,
  doc,
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyA4pmPSNZ7fOBvw2m4YJbe_c-67CpkX_GI',
  authDomain: 'to-do-f4d5d.firebaseapp.com',
  projectId: 'to-do-f4d5d',
  storageBucket: 'to-do-f4d5d.appspot.com',
  messagingSenderId: '626317327297',
  appId: '1:626317327297:web:7738f3363a86cb749dcd40',
  measurementId: 'G-98QGC5ZBXX',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
auth.languageCode = 'es';

const logOut = () => {
  signOut(auth)
    .then(() => {
      console.log('Cierre de sesión correcto');
    })
    .catch(error => {
      console.error(error);
    });
};

const loginGoogle = () => {
  signInWithRedirect(auth, provider)
    .then(result => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch(error => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};

const checkUserAuth = () => {
  onAuthStateChanged(auth, user => {
    if (user !== null) {
      let data = user.uid;
      return data;
    } else {
      return;
    }
  });
};

const createTask = async task => {
  const docRef = await addDoc(collection(db, 'tasks'), {
    tarea: task,
    user_id: auth.currentUser.uid,
  });
  console.log('Document written with ID: ', docRef.id);
};

const deleteTask = async taskId => {
  await deleteDoc(doc(db, 'tasks', taskId));
  console.log('deleted');
};

const getTasks = async () => {
  const q = query(
    collection(db, 'tasks'),
    where('user_id', '==', auth.currentUser.uid)
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot;
};

export { logOut, loginGoogle, createTask, getTasks, deleteTask, auth };
