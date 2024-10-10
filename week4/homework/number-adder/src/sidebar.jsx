import React from 'react';

function Sidebar({ total, history, operationCount, checkTotal, onRemoveHistoryItem }) {
  return (
    <div id="sidebar">
      <h5>Zekun's Bank Account</h5>
      <p id="nummmmber">{total}</p>
      
      <h6>Pay History</h6>
      <div id="summary">
        <p>Total additions: {operationCount.additions}</p>
        <p>Total subtractions: {operationCount.subtractions}</p>
      </div>
      
      <div id="totalMessage">
        {checkTotal()}
      </div>

      <ul id="historyList">
        {history.map((entry, index) => (
          <li key={index} onClick={() => onRemoveHistoryItem(index)}>
            {entry}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
