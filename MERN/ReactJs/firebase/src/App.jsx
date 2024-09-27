import React from 'react';
import Table from './Table';
import Form from './Form';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCXyxpdMNXy3nCDav8Y6j0gT3htEbOhaRY",
  authDomain: "wsjp42-4576e.firebaseapp.com",
  databaseURL: "https://wsjp42-4576e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "wsjp42-4576e",
  storageBucket: "wsjp42-4576e.appspot.com",
  messagingSenderId: "445081888325",
  appId: "1:445081888325:web:f2fbcdd07c1978a3fde52c",
  measurementId: "G-XZ1EQ06YZP"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);


export default function App() {
  return (
    <div className='max-w-[1300px] mx-auto grid grid-cols-6'>
      <div className='col-span-4'>
        <Table />
      </div>
      <div className='col-span-2'>
        <Form />
      </div>
    </div>
  )
}
