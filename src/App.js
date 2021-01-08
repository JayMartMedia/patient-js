import {useState} from 'react';

import PatientTable from './components/PatientTable';

function App() {
  const [viewPatients, setViewPatients] = useState(false);

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
        <PatientTable /> : 
        <button onClick={onViewPatientsClick}>View Patients</button>
      }
    </div>
  );
}

export default App;
