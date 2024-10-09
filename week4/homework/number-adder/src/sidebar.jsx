import React from 'react';

 function sidebar({total,history}) {

	return(

	<div id="sidebar">

        <h5>Zekun's Bank Account</h5>
        <p id="nummmmber">{total}</p>
        <h6>Pay History</h6>
        <div id="summary"></div>
        <div id="totalMessage"></div>
        <ul id="historyList"> 	
			{

			history.map((entry, index) => (
					<li key={index}>{entry} </li>
				))

			}
        </ul>
	</div>
		);
 }

export default sidebar;