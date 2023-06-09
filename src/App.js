import { Outlet } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Experiment Plattform
        </p>
      </header>
      <div className="App-body">
        <Outlet />
      </div>
      <footer className="App-footer">
        <p>
          Experiment provided by the University of St. Gallen © 2023.
        </p>
      </footer>
    </div>
  );
}

export default App;
