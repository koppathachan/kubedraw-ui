import { Cluster } from "./shapes/Cluster";

window.onload = () => {
	var width = window.innerWidth;
	var height = window.innerHeight;

	new Cluster({
		container: 'container',
		width: width,
		height: height,
	});

	if (!document) throw new Error("Not doc env");


}
