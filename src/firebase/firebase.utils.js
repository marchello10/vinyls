import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAnBetN1AvOSsjqlP-RGw_ZrH72qr1cpmE",
    authDomain: "vinyl-shop-6fd62.firebaseapp.com",
    databaseURL: "https://vinyl-shop-6fd62.firebaseio.com",
    projectId: "vinyl-shop-6fd62",
    storageBucket: "vinyl-shop-6fd62.appspot.com",
    messagingSenderId: "811283296862",
    appId: "1:811283296862:web:894edbc0d937e341997acf"
};

firebase.initializeApp(config);


export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    //snapshot simply represents the data
    const snapShot = await userRef.get();

    //for creating, getting, deleting, updating we use documentRef
    if (!snapShot.exists) {
        //creates a snapshot
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            alert('error creating user', error.message)
        }
    }
    return userRef;
};

export const addGenreAndDocuments = async (genreKey, objectsToAdd) => {
    const genreRef = firestore.collection(genreKey);

    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef = genreRef.doc();
        batch.set(newDocRef, obj);
    });

    return await batch.commit()
};

export const convertCollectionsSnapshotToMap = (genres) => {
    const transformedCollection = genres.docs.map(doc => {
        const { id, title, items } = doc.data();

        return {
            routeName: encodeURI(title.toLowerCase()),
            //id: doc.id,
            id,
            title,
            items
        }
    });

    //sets object keys
    return transformedCollection.reduce((accumulator, genre) => {
        accumulator[genre.title.toLowerCase()] = genre;
        return accumulator;
    }, {})
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;