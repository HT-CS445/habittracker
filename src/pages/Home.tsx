import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { accessibilityOutline, sparklesOutline, barChartOutline, sparkles } from 'ionicons/icons';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';

const Home: React.FC = () => {
  console.log('Home Sweet Home');
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader>
        Well howdy there
        <ExploreContainer name="Home Page" />
      </IonContent>
      <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/home"> 
            <IonIcon aria-hidden="true" icon={accessibilityOutline} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/tab2">
            <IonIcon aria-hidden="true" icon={sparklesOutline} />
            <IonLabel>Add</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/tab3">
            <IonIcon aria-hidden="true" icon={barChartOutline} />
            <IonLabel>Analyze</IonLabel>
          </IonTabButton>
        </IonTabBar>
    </IonPage>
  );
};

export default Home;
