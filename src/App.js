import {useState} from 'react';

import PatientTableContainer from './components/PatientTableContainer';
import Button from './components/buttons/Button';

import {Rest} from './utility/rest';

function App() {
  const [viewPatients, setViewPatients] = useState(false);

  window.Rest = Rest;

  const onViewPatientsClick = () => {
    setViewPatients(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Demo Patient Tracker</h1>
      </header>
      { 
        viewPatients ? 
        <PatientTableContainer /> : 
        <Button 
          text='View Patients'
          onClick={onViewPatientsClick}
        />
      }
    </div>
  );
}

export default App;
