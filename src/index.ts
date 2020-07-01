import Konva from "konva";
import {Namespace} from "./shapes/Namespace";

var width = window.innerWidth;
var height = window.innerHeight;

var stage = new Konva.Stage({
	container: 'container',
	width: width,
	height: height,
});
var layer = new Konva.Layer();
stage.add(layer);

var itemURL = '';
if (!document) throw new Error("Not doc env");

document.getElementById('drag-items')?.addEventListener('dragstart', function (e) {
	//@ts-ignore
	itemURL = e.target?.src;
});

var con = stage.container();
con.addEventListener('dragover', function (e) {
	e.preventDefault(); // !important
});

con.addEventListener('drop', function (e) {
	let resource: any;
	e.preventDefault();
	stage.setPointersPositions(e);

	Konva.Image.fromURL(itemURL, function (image: Konva.Image) {
		image.setAttrs({
			x: 100,
			y: 0,
			offsetX: 50,
			offsetY: 30,
			scaleX: 0.8,
			scaleY: 0.8,
		  });
			resource = new Namespace({
				width: 800,
				height: 500,
				stroke: 'black',
				strokeWidth: 2,
				dashEnabled: true,
				dash: ([2,4])
			}, image);
		layer.add(resource.Shape);
		resource.Shape.position(stage.getPointerPosition());
		//@ts-ignore
		resource.Shape.draggable(true);

		layer.batchDraw();
	});
});