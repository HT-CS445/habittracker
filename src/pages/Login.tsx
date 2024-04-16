import { IonButton, IonCard, IonCardContent, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { logInOutline } from 'ionicons/icons';
import LoginImage from '../assets/LoginImage.png'; 
import { signInWithGoogle } from '../authService'; // Import the signInWithGoogle function

const Login: React.FC = () => {
    const handleGoogleLogin = async () => {
        try {
            const user = await signInWithGoogle();
            console.log('User signed in:', user);
            // Optionally redirect the user or do some other post-login action
        } catch (error) {
            console.error('Login failed:', error);
            // Handle login errors (e.g., display an alert or message)
        }
    };

    return (
        <IonPage>
            <IonHeader className= "ion-text-center">
                <IonToolbar color={'primary'}>
                    <IonTitle>Habit Tracker</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <div className="ion-text-center ion-padding-top ion-margin-top">
                    <img src={LoginImage} alt='healthy habits icon'/>
                </div>
                <IonCard>
                    <IonCardContent className="ion-padding">
                        <IonButton color={'secondary'} expand='block' className='ion-margin-top' onClick={handleGoogleLogin}>
                            Sign in with Google
                            <IonIcon icon={logInOutline} slot="end" />
                        </IonButton>
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default Login;