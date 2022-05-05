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
            lastModified: new Date(),
        })
        .then(() => {
            console.log('new User document successfully written!');
        })
        .catch((error) => {
            console.error('Error writing User document: ', error);
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

export const getStudentsFromDb = async () => {
    try {
        const querySnapshot = await firestore.collection('users').get();
        const students = [];
        querySnapshot.forEach((doc) => {
            if (!doc.data().instructor && !doc.groupId) {
                students.push({ id: doc.id, ...doc.data() });
            }
        });
        return students;
    } catch (error) {
        console.log('error fetching user documents', error);
    }
};

export const createGroup = (groupId, students) => {
    firestore
        .collection('groups')
        .doc(groupId)
        .set({
            createdAt: new Date(),
            lastModified: new Date(),
            students,
        })
        .then(() => {
            console.log('Group document successfully written!');
        })
        .catch((error) => {
            console.error('Error writing Group document: ', error);
        });
};

export const getGroupsFromDb = async () => {
    try {
        const querySnapshot = await firestore.collection('groups').get();
        const groups = [];
        querySnapshot.forEach((doc) => {
            groups.push({ id: doc.id, ...doc.data() });
        });
        return groups;
    } catch (error) {
        console.log('error fetching group documents', error);
    }
};

export const updateGroup = async (groupId, group) => {
    const groupRef = firestore.collection('groups').doc(groupId);

    // Set the 'capital' field of the city
    return await groupRef.update(group);
};
