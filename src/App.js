import React from 'react';
import Component1 from './components/Component1';
import Component2 from './components/Component2';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to the React App</h1>
      </header>
      <main>
        <Component1 />
        <Component2 />
      </main>
    </div>
  );
}

export default App;