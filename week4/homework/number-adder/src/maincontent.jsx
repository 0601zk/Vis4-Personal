import React from 'react';

function Maincontent (props){
	return(

		<div id="content">
			<h4>Pay</h4>
			<div id="buttons">
				<button id="-2" onClick= {props.onRemovetwo}>-28900</button>
				<button id="-1" onClick= {props.onRemoveone}>-1</button>
				<button id="re" onClick= {props.onReset}>Reset</button>
				<button id="+1" onClick= {props.onAddOne}>+1</button>
				<button id="+2" onClick= {props.onAddTwo}>+28900</button>
			</div>
            <div id="clearAllContainer">
        <button id="clearAll" onClick={props.onClearAll}>Clear All</button> {/* Corrected here */}
      </div>    
		</div>

	);
}

export default Maincontent;