import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, DocumentData } from "firebase/firestore";
import db from '../firebaseConfig';

// Define a type for the data expected in documents
interface Document {
  [key: string]: any;
}

// Create a new document in a collection
export const addDocument = async (collectionName: string, data: Document): Promise<DocumentData> => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log("Document written with ID: ", docRef.id);
    return docRef;
  } catch (e: any) {
    console.error("Error adding document: ", e);
    throw new Error(e.message);
  }
};

// Fetch all documents from a collection
export const fetchDocuments = async (collectionName: string): Promise<Document[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const docsArray: Document[] = [];
    querySnapshot.forEach((doc) => {
      docsArray.push({ id: doc.id, ...doc.data() });
    });
    return docsArray;
  } catch (e: any) {
    console.error("Error fetching documents: ", e);
    throw new Error(e.message);
  }
};

// Update an existing document
export const updateDocument = async (collectionName: string, docId: string, newData: Document): Promise<void> => {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, newData);
    console.log("Document successfully updated!");
  } catch (error: any) {
    console.error("Error updating document: ", error);
    throw new Error(error.message);
  }
};

// Delete a document from a collection
export const deleteDocument = async (collectionName: string, docId: string): Promise<void> => {
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
    console.log("Document successfully deleted!");
  } catch (error: any) {
    console.error("Error deleting document: ", error);
    throw new Error(error.message);
  }
};