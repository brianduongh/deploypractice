import React from "react";
import Navs from "../components/Nav"
import Timer from "../components/Timer"


function ShowAccount(props) {
	return (
    	<div>
        <Navs page ="Account"/>
				<Timer id={props.match.params.id} />
    	</div>
  	);
}

export default ShowAccount;
