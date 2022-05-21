import { firestore } from './index';
import {
  createChatRoom,
  addChatRoomToAdmin,
  deleteChatRoom,
  removeChatRoomFromAdmin,
} from './chatRooms';

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
