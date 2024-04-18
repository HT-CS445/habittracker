import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonTabBar, IonTabButton, IonIcon, IonLabel, IonInput, IonButton, IonList, IonItem, IonAlert } from '@ionic/react';
import { accessibilityOutline, sparklesOutline, barChartOutline, sparkles } from 'ionicons/icons';
import { fetchDocuments, updateDocument } from '../logic/firestoreOperations';
import './Tracking.css';

const Tracking: React.FC = () => {
    const [tasks, setTasks] = useState<any[]>([]);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [selectedTask, setSelectedTask] = useState<any>(null);

    useEffect(() => {
        const loadTasks = async () => {
            const fetchedTasks = await fetchDocuments('users'); // Assuming 'users' collection stores tasks
            setTasks(fetchedTasks);
        };

        loadTasks();
    }, []);

    const markCompletion = async (completed: boolean) => {
        if (selectedTask) {
            await updateDocument('users', selectedTask.id, { completed: completed });
            setShowAlert(false);
            setSelectedTask(null);
            // Refresh the tasks list to show the updated status
            const updatedTasks = await fetchDocuments('users');
            setTasks(updatedTasks);
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Track Task Completion</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    {tasks.map((task) => (
                        <IonItem key={task.id}>
                            <IonLabel>{task.name} - {task.completed ? "Completed" : "Not Completed"}</IonLabel>
                            <IonButton onClick={() => { setSelectedTask(task); setShowAlert(true); }}>
                                Mark Completion
                            </IonButton>
                        </IonItem>
                    ))}
                </IonList>
                <IonAlert
                    isOpen={showAlert}
                    onDidDismiss={() => setShowAlert(false)}
                    header={`Confirm Completion for ${selectedTask?.name}`}
                    message={`Did you complete this task?`}
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

export default Tracking;