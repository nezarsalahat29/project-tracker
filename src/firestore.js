import firebase from 'firebase/compat/app';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const firestore = firebase.firestore();
export const GENERAL_CHATROOM = 'ELN8CuTpwdv5vIQ4AE4S';
const ADMIN_ID = 'jttNpOWD2HR3xAdS6WveFcr5fBm2';

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

export const updateUser = async (userId, user) => {
  const groupRef = firestore.collection('users').doc(userId);
  await groupRef.update(user);
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
    console.log('User document successfully deleted!');
  } catch (error) {
    console.error('Error removing user document: ', error);
  }
};

export const createGroup = () => {
  firestore
    .collection('groups')
    .add({
      createdAt: new Date(),
      lastModified: new Date(),
      students: [],
    })
    .then((groupRef) => {
      createChatRoom(groupRef.id, `group ${groupRef.id}`);
      addChatRoomToAdmin(groupRef.id);
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

export const getGroupFromDb = async (groupId) => {
  try {
    const doc = await firestore.collection('groups').doc(groupId).get();
    return { id: groupId, ...doc.data() };
  } catch (error) {
    console.log('error fetching group documents', error);
  }
};

export const updateGroup = async (groupId, group) => {
  const groupRef = firestore.collection('groups').doc(groupId);
  await groupRef.update(group);
  console.log('Group updated successfully');
};

export const deleteGroup = async (groupId) => {
  try {
    await firestore.collection('groups').doc(groupId).delete();
    deleteChatRoom(groupId);
    removeChatRoomFromAdmin(groupId);
    console.log('Group document successfully deleted!');
  } catch (error) {
    console.error('Error removing group document: ', error);
  }
};

export const createChatRoom = (docId, name) => {
  firestore
    .collection('chatRooms')
    .doc(docId)
    .set({
      name: name,
    })
    .then((docRef) => {
      firestore.collection(`chatRooms/${docId}/messages`).add({
        text: `Welcome to the ${name} chatRoom!`,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid: docId,
        name,
      });
      console.log('ChatRoom successfully written!');
    })
    .catch((error) => {
      console.error('Error creating ChatRoom document: ', error);
    });
};

export const deleteChatRoom = async (chatRoomId) => {
  try {
    const chatRoomRef = firestore.collection('chatRooms').doc(chatRoomId);
    const nestedCollections = chatRoomRef.listCollections();
    await Promise.all(
      nestedCollections.map((collection) => collection.delete())
    );
    await chatRoomRef.delete();
    console.log('ChatRoom document successfully deleted!');
  } catch (error) {
    console.error('Error removing ChatRoom document: ', error);
  }
};

export const getChatRoomsFromDb = async (chatRoomsIds) => {
  try {
    const chatRooms = [];
    const chatRoomsRef = firestore.collection('chatRooms');
    chatRoomsIds.forEach(async (id) => {
      const doc = await chatRoomsRef.doc(id).get();
      chatRooms.push({ id: doc.id, ...doc.data() });
    });

    console.log('database chatRooms: ', chatRooms);
    return chatRooms;
  } catch (error) {
    console.log('error fetching chatRoom documents', error);
  }
};

export const getChatRoomsFromDbNotOptimized = async (chatRoomsIds) => {
  try {
    const querySnapshot = await firestore.collection('chatRooms').get();
    const chatRooms = [];
    querySnapshot.forEach((doc) => {
      if (chatRoomsIds.includes(doc.id)) {
        chatRooms.push({ id: doc.id, ...doc.data() });
      }
    });
    return chatRooms;
  } catch (error) {
    console.log('error fetching chatRooms documents', error);
  }
};

export const sendMessage = async (chatRoomId, messageText, uid, username) => {
  try {
    const messagesRef = firestore
      .collection('chatRooms')
      .doc(chatRoomId)
      .collection('messages');

    messagesRef.add({
      text: messageText,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      username,
    });
  } catch (error) {
    console.log('error adding message to chatroom', error);
  }
};

export const useMessagesData = (chatRoomId) => {
  const messagesRef = firestore
    .collection('chatRooms')
    .doc(chatRoomId)
    .collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);
  return useCollectionData(query, { idField: 'id' });
};

const addChatRoomToAdmin = (chatRoomId) => {
  firestore
    .collection('users')
    .doc(ADMIN_ID)
    .get()
    .then((adminRef) => {
      updateUser(ADMIN_ID, {
        ...adminRef.data(),
        chatRooms: [...adminRef.data().chatRooms, chatRoomId],
      });
    });
};

const removeChatRoomFromAdmin = (chatRoomId) => {
  firestore
    .collection('users')
    .doc(ADMIN_ID)
    .get()
    .then((adminRef) => {
      updateUser(ADMIN_ID, {
        ...adminRef.data(),
        chatRooms: adminRef
          .data()
          .chatRooms.filter((chatRoom) => chatRoom !== chatRoomId),
      });
    });
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
