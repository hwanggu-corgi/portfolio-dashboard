import './App.css';
import { PrimaryNavMenu } from './components/Navigation';
import { HashRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <HashRouter>
      <div className="App">
        <PrimaryNavMenu/>
      </div>
    </HashRouter>
  );
}

export default App;
