import './App.css';
import { PrimaryNavMenu, SecondaryNavMenu } from './components/Navigation';
import { HashRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <HashRouter>
      <div className="App">
        <PrimaryNavMenu/>
        <SecondaryNavMenu/>
      </div>
    </HashRouter>
  );
}

export default App;
