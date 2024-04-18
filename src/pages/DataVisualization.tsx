import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonTabBar, IonTabButton, IonIcon, IonLabel, IonInput, IonButton, IonList, IonItem, IonAlert } from '@ionic/react';
import { accessibilityOutline, sparklesOutline, barChartOutline, sparkles } from 'ionicons/icons';
import { fetchDocuments } from '../logic/firestoreOperations';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './DataVisualization.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const DataVisualization: React.FC = () => {
    const [chartData, setChartData] = useState<any>();

    useEffect(() => {
        const loadData = async () => {
            const docs = await fetchDocuments('users');
            const completed = docs.filter(doc => doc.completed).length;
            const notCompleted = docs.length - completed;
            setChartData({
                labels: ['Completed', 'Not Completed'],
                datasets: [
                    {
                        data: [completed, notCompleted],
                        backgroundColor: ['#FF6384', '#36A2EB'],
                        hoverBackgroundColor: ['#FF6384', '#36A2EB']
                    }
                ]
            });
        };

        loadData();
    }, []);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Data Visualization</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {chartData && <Pie data={chartData} />}
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

export default DataVisualization;