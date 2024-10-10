import React, { useState } from "react";
import Sidebar from './sidebar';
import Maincontent from './maincontent';
import Header from './header';
import './App.css';

function App() {
  const [total, setTotal] = useState(0);
  const [history, setHistory] = useState([]);
  const [operationCount, setOperationCount] = useState({ additions: 0, subtractions: 0 });



  function handleAddone() {
    setTotal(total + 1);
    setHistory([...history, '+1']);
    setOperationCount({ ...operationCount, additions: operationCount.additions + 1 });
  }

  function handleAddtwo() {
    setTotal(total + 28900);
    setHistory([...history, '+28900']);
    setOperationCount({ ...operationCount, additions: operationCount.additions + 1 });
  }

  function handleRemoveone() {
    setTotal(total - 1);
    setHistory([...history, '-1']);
    setOperationCount({ ...operationCount, subtractions: operationCount.subtractions + 1 });
  }

  function handleRemovetwo() {
    setTotal(total - 28900);
    setHistory([...history, '-28900']);
    setOperationCount({ ...operationCount, subtractions: operationCount.subtractions + 1 });
  }

  function handleReset() {
    setTotal(0);
    setHistory([...history, 'Reset']);
  }

  function clearall() {
    setTotal(0);
    setHistory([]);
    setOperationCount({ additions: 0, subtractions: 0 });
  }

  // Check total return corresponding
  function checkTotal() {
    if (total > 0) {
      return "YOU ARE RICH";
    } else if (total < 0) {
      return "YOU ARE BROKE";
    } else {
      return "ZEROOOOO";
    }
  }

  return (
    <div className="App">
      <Header />

      <div id="mc">
        <Sidebar
          total={total}
          history={history}
          operationCount={operationCount}
          checkTotal={checkTotal}
        />

        <Maincontent
          onAddOne={handleAddone}
          onAddTwo={handleAddtwo}
          onRemovetwo={handleRemovetwo}
          onRemoveone={handleRemoveone}
          onReset={handleReset}
          onClearAll={clearall}
        />
      </div>
    </div>
  );
}

export default App;

