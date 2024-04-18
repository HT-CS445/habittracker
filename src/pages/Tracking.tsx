import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonTabBar, IonTabButton, IonIcon, IonLabel, IonAlert, IonInput, IonButton, IonList, IonItem, IonSelect, IonSelectOption } from '@ionic/react';
import { accessibilityOutline, sparklesOutline, barChartOutline, sparkles } from 'ionicons/icons';
import { onSnapshot, query, collection, orderBy, where } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import db from '../firebaseConfig';
import { updateDocument } from '../logic/firestoreOperations';

interface Habit {
    id: string;
    habit: string;
    completed: boolean;
    priority: 'High' | 'Medium' | 'Low';
}

const priorityLevels = {
    High: 1,
    Medium: 2,
    Low: 3
};

const Tracking: React.FC = () => {
    const [tasks, setTasks] = useState<Habit[]>([]);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [selectedTask, setSelectedTask] = useState<Habit | null>(null);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const q = query(collection(db, 'users'), where("userId", "==", user.uid), orderBy('priority', 'asc'));
                const unsubscribe = onSnapshot(q, (snapshot) => {
                    const fetchedTasks = snapshot.docs.map(doc => ({
                        ...doc.data() as Habit,
                        id: doc.id
                    })).sort((a, b) => priorityLevels[a.priority] - priorityLevels[b.priority]);
                    setTasks(fetchedTasks);
                }, (error) => {
                    console.error("Error fetching tasks:", error);
                    setError("Failed to fetch tasks due to permission issues. Please check your access rights.");
                });
                return () => unsubscribe();
            } else {
                setTasks([]);
                setError("User is not logged in.");
            }
        });
    }, []);

    const markCompletion = async (completed: boolean) => {
        if (selectedTask) {
            await updateDocument('users', selectedTask.id, { completed });
            setShowAlert(false);
            setSelectedTask(null);
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Track Habit Completion</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {error && <IonLabel color="danger">{error}</IonLabel>}
                <IonList>
                    {tasks.map(task => (
                        <IonItem key={task.id}>
                            <IonLabel>{task.habit} - {task.priority} Priority - <span style={{ color: task.completed ? 'green' : 'red' }}>{task.completed ? "Completed" : "Not Completed"}</span></IonLabel>
                            <IonButton onClick={() => { setSelectedTask(task); setShowAlert(true); }}>
                                Mark Completion
                            </IonButton>
                        </IonItem>
                    ))}
                </IonList>
                <IonAlert
                    isOpen={showAlert}
                    onDidDismiss={() => setShowAlert(false)}
                    header={`Confirm Completion for ${selectedTask?.habit}`}
                    message={`Did you complete this habit?`}
                    buttons={[
                        {
                            text: 'No',
                            handler: () => markCompletion(false)
                        },
                        {
                            text: 'Yes',
                            handler: () => markCompletion(true)
                        }
                    ]}
                />
            </IonContent>
            <IonTabBar slot="bottom">      
          <IonTabButton tab="tracking" href="/tracking">
            <IonIcon aria-hidden="true" icon={sparklesOutline} />
            <IonLabel>Tracking</IonLabel>
          </IonTabButton>
          <IonTabButton tab="addhabit" href="/addhabit"> 
            <IonIcon aria-hidden="true" icon={accessibilityOutline} />
            <IonLabel>Add Habit</IonLabel>
          </IonTabButton>
          <IonTabButton tab="datavisualization" href="/datavisualization">
            <IonIcon aria-hidden="true" icon={barChartOutline} />
            <IonLabel>Analyze</IonLabel>
          </IonTabButton>
        </IonTabBar>
        </IonPage>
    );
};

export default Tracking;