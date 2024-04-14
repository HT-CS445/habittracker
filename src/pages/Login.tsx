import { IonContent, IonFooter, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';

const Login: React.FC = () => {
    const doLogin = (event: any) => {
        event.preventDefault();
        console.log('doLogin');
    }
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color = {'success'}>
                    <IonTitle>Log In</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                Content goes here
            </IonContent>

            <IonFooter>
                <IonToolbar>
                    A healthy life is built one habit at a time.
                </IonToolbar>
            </IonFooter>
        </IonPage>
    );
};

export default Login;