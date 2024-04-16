import { Redirect, Route } from 'react-router-dom'; // import for routing
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { accessibilityOutline, sparklesOutline, barChartOutline, sparkles } from 'ionicons/icons';
import Tab1 from './pages/Home';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Login from './pages/Login';
import Register from './pages/Register';

setupIonicReact();

/*Routing setup!
This setup combines Ionic's tab-based navigation with React Router for handling routing within your application. 
It allows you to define different views for each tab and navigate between them seamlessly. */ 
const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs> { /*This component defines a tab-based navigation layout in your Ionic application. It contains one or more <IonTabButton> components that represent each tab in the tab bar.*/ }
        <IonRouterOutlet> { /* Inside <IonRouterOutlet>, define routes using <Route> components from react-router-dom. Each <Route> specifies a path and the component to render when that path matches the current URL. */ }
          <Route exact path="/Login"> { /* <Route> components define the routes for the app. The exact prop ensures that the specified component is only rendered when the URL matches the path exactly. */ }
            <Login />
          </Route>
          <Route exact path = "/Register">
            <Register />
          </Route>
          <Route exact path="/tab1">
            <Tab1 />
          </Route>
          <Route exact path="/tab2">
            <Tab2 />
          </Route>
          <Route path="/tab3">
            <Tab3 />
          </Route>
          <Route exact path="/">
            <Redirect to="/Login" />  { /* <Redirect> component is used to redirect users from one URL to another. In your code, the route with path="/", which matches the root URL, is redirected to /Login using <Redirect to="/Login" />. */ }
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/tab1"> { /* <IonTabButton> components define the tabs in your tab bar. Each <IonTabButton> corresponds to a route defined in the <IonRouterOutlet>. When a tab is clicked, it navigates to the corresponding route specified in the href prop. */ }
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
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
