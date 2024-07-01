
import { collection, getDocs, doc } from 'firebase/firestore';
import { db, auth } from '../configuration/Configuration';

const fetchUserData = async (collectionName) => {
    const user = auth.currentUser;

    if (!user) {
        throw new Error('User not authenticated');
    }

    const userId = user.uid;
    const userDocRef = doc(db, 'users', userId);
    const collectionRef = collection(userDocRef, collectionName);

    const querySnapshot = await getDocs(collectionRef);
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return data;
};

export {fetchUserData};
