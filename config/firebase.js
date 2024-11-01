import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import Constants from 'expo-constants';
const { extra } = Constants.expoConfig

const firebaseConfig = {
    apiKey: extra.apiKey,
    authDomain: extra.authDomain,
    projectId: extra.projectId,
    storageBucket: extra.storageBucket,
    messagingSenderId: extra.messagingSenderId,
    appId: extra.appId,
    databaseURL: extra.databaseURL
  };

try {
    initializeApp(firebaseConfig);
    console.log('Firebase initialized successfully');
  } catch (error) {
    console.error('Error initializing Firebase:', error);
  }
export const auth = getAuth();
export const database = getFirestore(); 


