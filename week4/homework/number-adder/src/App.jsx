import Reac, { useState } from "react";
import Sidebar from './sidebar';
import Maincontent from './maincontent';
import Header from './header';
import logo from './logo.svg';
import './App.css';

function App() {
  const [total,setTotal] = useState(0);
  const [history,setHistory] = useState([]);

  function handleAddone() {
    setTotal(total + 1);
    setHistory([...history, '+1']);

    }
  function handleAddtwo() {
    setTotal(total + 2);
    setHistory([...history, '+2']);
      
    }

  function handleRemoveone() {
    setTotal(total - 1);
    setHistory([...history, '-1']);
      
    }

  function handleRemovetwo() {
    setTotal(total - 2);
    setHistory([...history, '-2']);
      
    }

  function handleReset() {
    setTotal(0);
    setHistory([...history, 'Reset']);
      
    }


  return (
    <div className="App">
      <Header />

      <div id="mc">
      <Sidebar
      total={total}
      history={history}
      />

      <Maincontent
       onAddOne={handleAddone}
       onAddTwo={handleAddtwo}
       onRemovetwo={handleRemovetwo}
       onRemoveone={handleRemoveone}
       onReset={handleReset}


       />
      </div>
    </div>
  );
}

export default App;
