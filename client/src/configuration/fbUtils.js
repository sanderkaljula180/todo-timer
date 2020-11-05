import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { firebaseConfig } from './fbConfig';

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();