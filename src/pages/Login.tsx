import { IonButton, IonCard, IonCardContent, IonContent, IonFooter, IonHeader, IonIcon, IonInput, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { logInOutline, personCircleOutline } from 'ionicons/icons';
import LoginImage from '../assets/LoginImage.png'; 

const Login: React.FC = () => {
    const doLogin = (event: any) => {
        event.preventDefault();
        console.log('doLogin');
    }
    return (
        <IonPage>
            <IonHeader className= "ion-text-center">
                <IonToolbar color = {'primary'}>
                    <IonTitle>Habit Tracker</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent class="ion-padding">
            <IonContent scrollY ={false}>
                <div className="ion-text-center ion-padding-top ion-margin-top">
                <img src={LoginImage} alt='healthy habits icon'/>
                </div>
                <IonCard>
                    <IonCardContent class = "ion-padding">
                        <form onSubmit={doLogin}>
                            <IonInput label="email" type='email' fill='outline' labelPlacement='floating' > </IonInput>
                            <IonInput className="ion-margin-top" fill='outline' label="password" type='password' labelPlacement='floating' > </IonInput>
                            <IonButton routerLink="/tab1" color={'secondary'} type='submit' expand='block' className='ion-margin-top'>
                                Login
                                <IonIcon icon={logInOutline} slot="end" />    
                            </IonButton>
                            <IonButton routerLink="/register" color={'tertiary'} type='button' expand='block'>Create Account
                            <IonIcon icon={personCircleOutline} slot="end" />   
                            </IonButton> 
                        </form>
                    </IonCardContent>
                </IonCard>
            </IonContent>
            </IonContent>
        </IonPage>
    );
};

export default Login;