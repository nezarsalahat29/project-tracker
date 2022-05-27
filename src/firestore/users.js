import { firestore, GENERAL_CHATROOM } from './index';
import {
  addChatRoomToAdmin,
  createChatRoom,
  deleteChatRoom,
  removeChatRoomFromAdmin,
} from './chatRooms';
import { auth } from '../firebase';

export const createUserDocument = (user, additionalData) => {
  if (!user) return;

  firestore
    .collection('users')
    .doc(user.uid)
    .set({
      email: user.email,
      ...additionalData,
      groupId: null,
      createdAt: new Date(),
      lastModified: new Date(),
      chatRooms: [GENERAL_CHATROOM, user.uid],
    })
    .then(() => {
      console.log('updating admin');
      addChatRoomToAdmin(user.uid);

      createChatRoom(user.uid, additionalData.name);

      console.log('new User document successfully written!');
    })
    .catch((error) => {
      console.error('Error writing User document: ', error);
    });
};

export const getUserDocument = async (userId) => {
  try {
    const user = await firestore.collection('users').doc(userId).get();
    if (user.exists) return { id: userId, ...user.data() };
    else console.log('No such document!');
  } catch (error) {
    console.log('error getting user document', error);
  }
};

export const updateUser = async (userId, newUser) => {
  const groupRef = firestore.collection('users').doc(userId);
  await groupRef.update(newUser);
  if (userId === auth.currentUser.uid) {
    console.log('updating local storage');
    localStorage.setItem(
      'currentUser',
      JSON.stringify({ id: userId, ...newUser })
    );
  }
  console.log('User updated successfully');
};

export const getStudentsFromDb = async () => {
  try {
    const querySnapshot = await firestore.collection('users').get();
    const students = [];
    querySnapshot.forEach((doc) => {
      if (!doc.data().instructor) {
        students.push({ id: doc.id, ...doc.data() });
      }
    });
    return students;
  } catch (error) {
    console.log('error fetching user documents', error);
  }
};

export const getStudentFromDb = async (userId) => {
  try {
    const doc = await firestore.collection('users').doc(userId).get();
    return { id: userId, ...doc.data() };
  } catch (error) {
    console.log('error fetching user documents', error);
  }
};

export const deleteUser = async (userId) => {
  try {
    await firestore.collection('users').doc(userId).delete();
    deleteChatRoom(userId);
    removeChatRoomFromAdmin(userId);
    console.log('User document successfully deleted!');
  } catch (error) {
    console.error('Error removing user document: ', error);
  }
};

export const updateRole = async (uid,Role) => {
  try {
    firestore
      .collection("users")
      .doc(uid)
      .update({ role: Role });
    
  } catch (error) {
    console.log("error updating Role to user", error);
  }
};

// const userRef = firestore
//   .collection('users')
//   .doc('jttNpOWD2HR3xAdS6WveFcr5fBm2');
// userRef.update({
//   chatRooms: [
//     'ELN8CuTpwdv5vIQ4AE4S',
//     'QMXUybyTUUerrw91sLEY4wgnc8t1',
//     'fzw7eFaKbsRPS1NiuPUE3GqCuys2',
//     'qzTPOKrQC5aqjGPRGB7xAamFjMI2',
//   ],
// });
