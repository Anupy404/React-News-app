import React from "react";
import loading from "../loading.gif";

const Spinner = () => {
	return (
		<div className="text-center">
			<img src={loading} alt="loading" className="my-4" />
		</div>
	);
};

export default Spinner;
