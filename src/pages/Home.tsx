import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonTabBar, IonTabButton, IonIcon, IonLabel, IonInput, IonButton, IonList, IonItem } from '@ionic/react';
import { accessibilityOutline, sparklesOutline, barChartOutline, sparkles } from 'ionicons/icons';
import { addDocument, fetchDocuments, updateDocument, deleteDocument } from '../logic/firestoreOperations.js';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';

const Home: React.FC = () => {
  const [documents, setDocuments] = useState<any[]>([]);
  const [inputData, setInputData] = useState({ name: '', age: '' });
  const [selectedDocId, setSelectedDocId] = useState<string>('');

  // Fetch documents on component mount
  useEffect(() => {
    fetchDocuments("users").then(setDocuments).catch(console.error);
  }, []);

  const handleAdd = () => {
    addDocument("users", { name: inputData.name, age: Number(inputData.age) })
      .then(docRef => {
        console.log("Document added with ID:", docRef.id);
        setDocuments([...documents, { id: docRef.id, ...inputData, age: Number(inputData.age) }]);
        setInputData({ name: '', age: '' }); // Reset input after adding
      })
      .catch(console.error);
  };

  const handleUpdate = (id: string) => {
    updateDocument("users", id, inputData)
      .then(() => {
        console.log("Document updated");
        const updatedDocs = documents.map(doc => doc.id === id ? { ...doc, ...inputData } : doc);
        setDocuments(updatedDocs);
        setInputData({ name: '', age: '' });
        setSelectedDocId('');
      })
      .catch(console.error);
  };

  const handleDelete = (id: string) => {
    deleteDocument("users", id)
      .then(() => {
        console.log("Document deleted");
        setDocuments(documents.filter(doc => doc.id !== id));
      })
      .catch(console.error);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonInput value={inputData.name} placeholder="Name" onIonChange={e => setInputData({ ...inputData, name: e.detail.value! })}></IonInput>
        <IonInput value={inputData.age} type="number" placeholder="Age" onIonChange={e => setInputData({ ...inputData, age: e.detail.value! })}></IonInput>
        <IonButton onClick={handleAdd}>Add Document</IonButton>
        <IonList>
          {documents.map(doc => (
            <IonItem key={doc.id}>
              <IonLabel>{doc.name} ({doc.age} years)</IonLabel>
              <IonButton onClick={() => { setInputData({ name: doc.name, age: String(doc.age) }); setSelectedDocId(doc.id); }}>Select</IonButton>
              <IonButton color="danger" onClick={() => handleDelete(doc.id)}>Delete</IonButton>
            </IonItem>
          ))}
        </IonList>
        {selectedDocId && <IonButton onClick={() => handleUpdate(selectedDocId)}>Update Document</IonButton>}
      </IonContent>
    </IonPage>
  );
};

export default Home;