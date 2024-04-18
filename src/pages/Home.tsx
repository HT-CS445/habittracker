import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonTabBar, IonTabButton, IonIcon, IonLabel, IonInput, IonButton, IonList, IonItem } from '@ionic/react';
import { accessibilityOutline, sparklesOutline, barChartOutline, sparkles } from 'ionicons/icons';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { addDocument, fetchDocuments, updateDocument, deleteDocument } from '../logic/firestoreOperations.js';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';

const Home: React.FC = () => {
  const [documents, setDocuments] = useState<any[]>([]);
  const [inputData, setInputData] = useState({ name: '', age: '' });
  const [user, setUser] = useState<any>(null);
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const docs = await fetchDocuments("users");  // Assuming 'users' is your collection name
        setDocuments(docs);
      } else {
        setUser(null);
        setDocuments([]);  // Clear documents if logged out
      }
    });
    return () => unsubscribe();  // Clean up the subscription
  }, []);

  const loadDocuments = async () => {
    if (!user) return;
    try {
      const docs = await fetchDocuments("users");
      setDocuments(docs);
    } catch (error) {
      console.error("Failed to fetch documents:", error);
    }
  };

  const handleAdd = async () => {
    if (!user) {
      console.log("User not authenticated");
      return;
    }
    try {
      await addDocument("users", { name: inputData.name, age: parseInt(inputData.age, 10), userId: user.uid });
      await loadDocuments();
      setInputData({ name: '', age: '' });  // Reset input after adding
    } catch (error) {
      console.error("Failed to add document:", error);
    }
  };

  const handleUpdate = async () => {
    if (!user || !selectedDocId) {
      console.log("No document selected or user not authenticated");
      return;
    }
    try {
      await updateDocument("users", selectedDocId, { name: inputData.name, age: parseInt(inputData.age, 10) });
      await loadDocuments();
      setInputData({ name: '', age: '' });  // Reset input after updating
      setSelectedDocId(null);  // Clear selection
    } catch (error) {
      console.error("Failed to update document:", error);
    }
  };

  const handleDelete = async (docId: string) => {
    if (!user) {
      console.log("User not authenticated");
      return;
    }
    try {
      await deleteDocument("users", docId);
      await loadDocuments();
    } catch (error) {
      console.error("Failed to delete document:", error);
    }
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
        {selectedDocId && <IonButton onClick={handleUpdate}>Update Document</IonButton>}
        <IonList>
          {documents.map(doc => (
            <IonItem key={doc.id}>
              <IonLabel>{doc.name} ({doc.age} years)</IonLabel>
              <IonButton onClick={() => { setInputData({ name: doc.name, age: String(doc.age) }); setSelectedDocId(doc.id); }}>Select</IonButton>
              <IonButton color="danger" onClick={() => handleDelete(doc.id)}>Delete</IonButton>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
      
      <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/home"> 
            <IonIcon aria-hidden="true" icon={accessibilityOutline} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tracking" href="/tracking">
            <IonIcon aria-hidden="true" icon={sparklesOutline} />
            <IonLabel>Tracking</IonLabel>
          </IonTabButton>
          <IonTabButton tab="datavisualization" href="/datavisualization">
            <IonIcon aria-hidden="true" icon={barChartOutline} />
            <IonLabel>Analyze</IonLabel>
          </IonTabButton>
        </IonTabBar>
    </IonPage>
  );
};

export default Home;