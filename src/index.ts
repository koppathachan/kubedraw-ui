import Konva from "konva";
import {Namespace} from "./shapes/Namespace";
import {ReplicaSet} from "./shapes/ReplicaSet";
import {Position} from "./shapes/Position";
import {Service} from "./shapes/Service";
import {names} from "konva/types/Node";

window.onload = () => {

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
	let replicaSet: any;
	con.addEventListener('drop', function (e) {
		e.preventDefault();
		stage.setPointersPositions(e);

		Konva.Image.fromURL(itemURL, function (image: Konva.Image) {
			image.setAttrs({
				x: 100,
				y: 0,
				offsetX: 50,
				offsetY: 30,
				scaleX: 1,
				scaleY: 1,
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
				layer.add(namespace.Group);
				layer.batchDraw();
			} else if (itemURL == "http://localhost:3001/assets/rs.svg" && namespace != undefined) {
				replicaSet = new ReplicaSet({
					name: "ReplicaSet",
					width: 180,
					height: 100,
					stroke: 'black',
					strokeWidth: 2,
					cornerRadius: 50,
				}, image);
				replicaSet.Group.position(new Position(namespace.Position.X + 350, namespace.Position.Y + 100));
				replicaSet.addPods();
				namespace.Group.add(replicaSet.Group);
				layer.batchDraw();
			} else if (itemURL == "http://localhost:3001/assets/svc.svg" && namespace != undefined) {
				image.setAttrs({
					x: stage.find('.ReplicaSet')[0].getParent().attrs.x - 400,
					y: stage.find('.ReplicaSet')[0].getParent().attrs.y - 50,
				});
				if (replicaSet != null) {
					let service = new Service({
						points: [
							stage.find('.ReplicaSet')[0].getParent().attrs.x - 350,
							stage.find('.ReplicaSet')[0].getParent().attrs.y - 50,
							image.position().x,
							image.position().y
						],
						stroke: "black",
						strokeWidth: 2,
					}, image);

					replicaSet.Group.add(service.Group);
					namespace.Group.add(replicaSet.Group);
					layer.batchDraw();
				}
				else {
					alert("Create a deployment first to add a service");
				}
			}
		});
	});
}