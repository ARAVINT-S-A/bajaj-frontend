import React, { useEffect } from 'react';
import JsonProcessor from './component/JsonProcessor';
import './App.css';

function App() {
  useEffect(() => {
    document.title = 'Your Roll Number';
  }, []);

  return (
    <div className="App">
      <JsonProcessor />
    </div>
  );
}

export default App;
