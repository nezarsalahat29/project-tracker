import { firestore } from './firebase';

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
    })
    .then(() => {
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

export const createGroup = () => {
  firestore
    .collection('groups')
    .add({
      createdAt: new Date(),
      lastModified: new Date(),
      students: [],
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
    console.log('Group document successfully deleted!');
  } catch (error) {
    console.error('Error removing group document: ', error);
  }
};

export const createConversation = () => {
  firestore
    .collection('conversations')
    .add({
        name: "",
        isGroup: true,
        chatroomID: "",
        lastSenderName: "",
        lastMessage: "",
        participants: [],
        Messages: [],

  },)
    .then(() => {
      console.log('Conversation successfully written!');
    })
    .catch((error) => {
      console.error('Error writing Conversation document: ', error);
    });
};

export const deleteConversation = async ( convID) => {
  try {
    await firestore.collection('conversations').doc(convID).delete();
    console.log('conversation document successfully deleted!');
  } catch (error) {
    console.error('Error removing conversation document: ', error);
  }
};


export const getConversationFromDb = async (conversationIds) => {
  try {
    const conversations = [];
    const conversationsRef = firestore.collection('conversations');
    const snapshot = await conversationsRef.where('chatroomID', 'in', conversationIds).get();
    if (snapshot.empty) {
    console.log('No matching documents.');
    return;
    }  

    snapshot.forEach(doc => {
      conversations.push({"id":doc.id,...doc.data()})
    });
    
    return conversations;

    
  } catch (error) {
    console.log('error fetching conversation documents', error);
  }
};


export const setMessagesToConversation = async (conversationID,conversation) =>{
  

  try {
    const conversationsRef = firestore.collection('conversations');
    const snapshot = await conversationsRef.where('chatroomID', '==', conversationID).get();
    console.log(snapshot.docs[0].id);
    const conversationRef = conversationsRef.doc(snapshot.docs[0].id);
    await conversationRef.update(conversation);
  } catch (error) {
    console.log('error updating conversation  messages ', error);
  }

}