import firebase, { firestore } from './index';

export const createProject = ({
  title,
  deliverables,
  description,
  dueDate,
  tasks,
}) => {
  return firestore
    .collection('projects')
    .add({
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      lastModified: firebase.firestore.FieldValue.serverTimestamp(),
      title,
      deliverables,
      description,
      dueDate,
      tasks: tasks || [],
    })
    .then((projectRef) => {
      console.log('Project document successfully written!');
    })
    .catch((error) => {
      console.error('Error writing Project document: ', error);
    });
};

export const getAllProjects = async () => {
  try {
    const querySnapshot = await firestore.collection('projects').get();
    const projects = [];
    querySnapshot.forEach((doc) => {
      projects.push({ id: doc.id, ...doc.data() });
    });
    return projects;
  } catch (error) {
    console.log('error fetching project documents', error);
  }
};

export const getProject = async (projectId) => {
  try {
    const doc = await firestore.collection('projects').doc(projectId).get();
    return { id: projectId, ...doc.data() };
  } catch (error) {
    console.log('error fetching project document', error);
  }
};

export const deleteProject = async (projectId) => {
  try {
    await firestore.collection('projects').doc(projectId).delete();
    console.log('Project document successfully deleted!');
  } catch (error) {
    console.error('Error removing project document: ', error);
  }
};
