import './App.css';
import Graph from './components/graph';
import Form from './components/form';

function App() {
  return (
    <div className="App">
      <div className="container mx-auto max-w-6xl text-center drop-shadow-lg text-grey-800">
        <h1 className="text-4xl py-8 mb-10 bg-slate-800 text-white rounded">
          Expense Tracker
          <h1 className="text-lg mt-2 bg-slate-800 text-white rounded">
            Add a transaction and keep track of where you spend your money
          </h1>
        </h1>

        {/*Grid Columns*/}
        <div className="grid md:grid-cols-2 gap-30">
          {/*Chart*/}
          <Graph />
          {/*Form*/}
          <Form />
        </div>
      </div>
    </div>
  );
}

export default App;
