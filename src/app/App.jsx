import { Provider } from 'react-redux';
import { useRoutes } from 'react-router-dom';
import { MatxTheme } from './components';
import { SettingsProvider } from './contexts/SettingsContext';
import { Store } from './redux/Store';
import routes from './routes';

const App = () => {
  const content = useRoutes(routes);

  return (
    <MatxTheme>
      <Provider store={Store}>
        <SettingsProvider>
          <MatxTheme>
            {content}
          </MatxTheme>
        </SettingsProvider>
      </Provider>
    </MatxTheme>
  );
};

export default App;
