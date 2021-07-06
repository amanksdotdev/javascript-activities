import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

firebase.initializeApp(
    {
        apiKey: "AIzaSyD92oLfWIxda7B-fZv96rRxwP10yEHCL-g",
        authDomain: "fir-demo-fd464.firebaseapp.com",
        projectId: "fir-demo-fd464",
        storageBucket: "fir-demo-fd464.appspot.com",
        messagingSenderId: "124401657319",
        appId: "1:124401657319:web:f886dd91e5ef686c208942",
    }
);

export default firebase;