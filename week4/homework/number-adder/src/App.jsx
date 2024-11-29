import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar';
import Maincontent from './maincontent';
import Header from './header';
import './App.css';
import useWebSocket, { ReadyState } from 'react-use-websocket';

function App() {
  const socketUrl = 'ws://localhost:8080';
  const customID = 'React-APP';

  const [total, setTotal] = useState(0);
  const [history, setHistory] = useState([]);
  const [operationCount, setOperationCount] = useState({
    additions: 0,
    subtractions: 0,
  });
  const [potentiometerValue, setPotentiometerValue] = useState(0);

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
    onOpen: () => {
      sendMessage(JSON.stringify({ type: 'setID', id: customID }));
    },
  });

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  useEffect(() => {
    if (lastMessage !== null) {
      try {
        const data = JSON.parse(lastMessage.data);
        if (data.potentiometer !== undefined) {
          setPotentiometerValue(data.potentiometer);
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    }
  }, [lastMessage]);

  function handleAddone() {
    setTotal(total + 1);
    setHistory([...history, '+1']);
    setOperationCount({
      ...operationCount,
      additions: operationCount.additions + 1,
    });
    sendMessage(JSON.stringify({ type: 'ADD_1' }));
  }

  function handleAddtwo() {
    setTotal(total + 28900);
    setHistory([...history, '+28900']);
    setOperationCount({
      ...operationCount,
      additions: operationCount.additions + 1,
    });
    sendMessage(JSON.stringify({ type: 'ADD_28900' }));
  }

  function handleRemoveone() {
    setTotal(total - 1);
    setHistory([...history, '-1']);
    setOperationCount({
      ...operationCount,
      subtractions: operationCount.subtractions + 1,
    });
    sendMessage(JSON.stringify({ type: 'REMOVE_1' }));
  }

  function handleRemovetwo() {
    setTotal(total - 28900);
    setHistory([...history, '-28900']);
    setOperationCount({
      ...operationCount,
      subtractions: operationCount.subtractions + 1,
    });
    sendMessage(JSON.stringify({ type: 'REMOVE_28900' }));
  }

  function handleReset() {
    setTotal(0);
    setHistory([...history, 'Reset']);
    sendMessage(JSON.stringify({ type: 'RESET' }));
  }

  function clearall() {
    setTotal(0);
    setHistory([]);
    setOperationCount({ additions: 0, subtractions: 0 });
    sendMessage(JSON.stringify({ type: 'CLEAR_ALL' }));
  }

  function checkTotal() {
    if (total > 0) {
      return 'YOU ARE RICH';
    } else if (total < 0) {
      return 'YOU ARE BROKE';
    } else {
      return 'ZEROOOOO';
    }
  }

  function removeHistoryItem(index) {
    const itemToRemove = history[index];
    const newHistory = history.filter((_, i) => i !== index);

    setHistory(newHistory);

    let valueToRemove = 0;
    if (itemToRemove.includes('+')) {
      valueToRemove = parseInt(itemToRemove.replace('+', ''));
      setTotal(total - valueToRemove);
      setOperationCount({
        ...operationCount,
        additions: operationCount.additions - 1,
      });
    } else if (itemToRemove.includes('-')) {
      valueToRemove = parseInt(itemToRemove.replace('-', ''));
      setTotal(total + valueToRemove);
      setOperationCount({
        ...operationCount,
        subtractions: operationCount.subtractions - 1,
      });
    }
    sendMessage(JSON.stringify({ type: 'REMOVE_HISTORY_ITEM', index }));
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
          onRemoveHistoryItem={removeHistoryItem}
          connectionStatus={connectionStatus} // Display WebSocket connection status
          potentiometerValue={potentiometerValue} // Display potentiometer value if desired
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
