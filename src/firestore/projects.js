import { updateGroup } from './groups';
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
      tasks,
    })
    .then(() => {
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

export const deleteProject = async (projectId, groupId) => {
  try {
    await firestore.collection('projects').doc(projectId).delete();
    if (groupId) updateGroup(groupId, { projectId: null });
    console.log('Project document successfully deleted!');
  } catch (error) {
    console.error('Error removing project document: ', error);
  }
};

export const updateProject = async (projectId, newProject) => {
  const projectRef = firestore.collection('projects').doc(projectId);
  await projectRef.update(newProject);
  console.log('Project updated successfully');
};
