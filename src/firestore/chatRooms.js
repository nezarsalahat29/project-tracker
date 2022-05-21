import firebase, { firestore, ADMIN_ID } from "./index";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { updateUser } from "./users";
export const createChatRoom = (docId, name) => {
  firestore
    .collection("chatRooms")
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
      console.log("ChatRoom successfully written!");
    })
    .catch((error) => {
      console.error("Error creating ChatRoom document: ", error);
    });
};

export const deleteChatRoom = async (chatRoomId) => {
  try {
    const chatRoomRef = firestore.collection("chatRooms").doc(chatRoomId);
    const nestedCollections = chatRoomRef.listCollections();
    await Promise.all(
      nestedCollections.map((collection) => collection.delete())
    );
    await chatRoomRef.delete();
    console.log("ChatRoom document successfully deleted!");
  } catch (error) {
    console.error("Error removing ChatRoom document: ", error);
  }
};

export const getChatRoomsFromDb = async (chatRoomsIds) => {
  try {
    const chatRooms = [];
    const chatRoomsRef = firestore.collection("chatRooms");
    chatRoomsIds.forEach(async (id) => {
      const doc = await chatRoomsRef.doc(id).get();
      chatRooms.push({ id: doc.id, ...doc.data() });
    });

    console.log("database chatRooms: ", chatRooms);
    return chatRooms;
  } catch (error) {
    console.log("error fetching chatRoom documents", error);
  }
};

export const sendMessage = async (chatRoomId, messageText, uid, username) => {
  try {
    //db.collection("users").doc("frank").update({
    //"favorites.firebase": "Help")}
    //})
    firestore
      .collection("chatRooms")
      .doc(chatRoomId)
      .update({ lastMessage: messageText, lastSender: username });
    const messagesRef = firestore
      .collection("chatRooms")
      .doc(chatRoomId)
      .collection("messages");

    messagesRef.add({
      text: messageText,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      username,
    });
  } catch (error) {
    console.log("error adding message to chatroom", error);
  }
};

export const useMessagesData = (chatRoomId) => {
  const messagesRef = firestore
    .collection("chatRooms")
    .doc(chatRoomId)
    .collection("messages");
  const query = messagesRef.orderBy("createdAt","asc").limit(100);
  return useCollectionData(query, { idField: "id" });
};

export const addChatRoomToAdmin = (chatRoomId) => {
  firestore
    .collection("users")
    .doc(ADMIN_ID)
    .get()
    .then((adminRef) => {
      updateUser(ADMIN_ID, {
        ...adminRef.data(),
        chatRooms: [...adminRef.data().chatRooms, chatRoomId],
      });
    });
};

export const removeChatRoomFromAdmin = (chatRoomId) => {
  firestore
    .collection("users")
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

export const getChatRoomsFromDbNotOptimized = async (chatRoomsIds) => {
  try {
    const querySnapshot = await firestore.collection("chatRooms").get();
    const chatRooms = [];
    querySnapshot.forEach((doc) => {
      if (chatRoomsIds.includes(doc.id)) {
        chatRooms.push({ id: doc.id, ...doc.data() });
      }
    });
    return chatRooms;
  } catch (error) {
    console.log("error fetching chatRooms documents", error);
  }
};
