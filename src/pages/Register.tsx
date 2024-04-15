import { IonBackButton, IonButton, IonCard, IonCardContent, IonContent, IonFooter, IonHeader, IonIcon, IonInput, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { home, arrowForwardOutline } from 'ionicons/icons';
import LoginImage from '../assets/LoginImage.png'; 

const Register: React.FC = () => {
    const doRegister= (event: any) => {
        event.preventDefault();
        console.log('doRegister');
    }

    return (
        <IonPage>
            <IonHeader className= "ion-text-center">
                <IonToolbar color = {"primary"}>
                    <IonButton slot="start">
                        <IonBackButton defaultHref='/' />
                    </IonButton>
                    <IonTitle>Create Account</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent scrollY = {false}>

                <IonCard>
                    <IonCardContent class = "ion-padding">
                        <form onSubmit={doRegister}>
                            <IonInput label="email" type='email' fill='outline' labelPlacement='floating' > </IonInput>
                            <IonInput className="ion-margin-top" fill='outline' label="password" type='password' labelPlacement='floating' > </IonInput>
                            <IonButton routerLink="/tab1" color={'tertiary'} type='submit' expand='block' className='ion-margin-top'>
                                Create Account
                                <IonIcon icon={arrowForwardOutline} slot="end" />    
                            </IonButton>

                        </form>
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default Register;