import { firestore } from './firebase';

export const createUserDocument = (user, additionalData) => {
    if (!user) return;

    firestore
        .collection('users')
        .doc(user.uid)
        .set({
            email: user.email,
            ...additionalData,
            createdAt: new Date(),
        })
        .then(() => {
            console.log('Document successfully written!');
        })
        .catch((error) => {
            console.error('Error writing document: ', error);
        });
};

export const getUserDocument = async (userId) => {
    console.log(userId);

    try {
        const user = await firestore.collection('users').doc(userId).get();
        if (user.exists) return user.data();
        else console.log('No such document!');
    } catch (error) {
        console.log('error getting user document', error);
    }
};
