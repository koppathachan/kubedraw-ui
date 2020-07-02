import Konva from "konva";
import {Namespace} from "./shapes/Namespace";
import {ReplicaSet} from "./shapes/ReplicaSet";
import {Position} from "./shapes/Position";

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

let namespace: any;
con.addEventListener('drop', function (e) {
	let replicaSet: any;
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
		if (itemURL == "http://localhost:3001/assets/ns.svg") {
			namespace = new Namespace({
				width: 800,
				height: 500,
				stroke: 'black',
				strokeWidth: 2,
				dashEnabled: true,
				dash: ([2, 4])
			}, image);
			namespace.Group.position(stage.getPointerPosition());
		} else if (itemURL == "http://localhost:3001/assets/rs.svg" && namespace != undefined) {
			replicaSet = new ReplicaSet({
				width: 150,
				height: 50,
				stroke: 'black',
				strokeWidth: 2,
				cornerRadius: 50,
			}, image);
			replicaSet.Group.add(replicaSet.addPods());
			replicaSet.Group.position(new Position(namespace.Position.X + 350, namespace.Position.Y + 100));
			namespace.Group.add(replicaSet.Group);
		}
		layer.add(namespace.Group);
		layer.batchDraw();
	});
});