import Konva from "konva";
import {NamespaceMutation} from "../api/NamespaceMutation";
import {Namespace} from "./Namespace";
import {DeploymentMutation} from "../api/DeploymentMutation";
import {ServiceMutation} from "../api/ServiceMutation";
import {ReplicaSet} from "./ReplicaSet";
import {Service} from "./Service";
import {Secret} from "./Secret";
import {ConfigMap} from "./ConfigMap";
import {Position} from "./Position";
import {Ingress} from "./Ingress";

export class Cluster {
	private readonly layer: Konva.Layer;
	private readonly stage: Konva.Stage;
	constructor(config: any) {
		this.stage = new Konva.Stage(config);
		this.layer = new Konva.Layer();
		this.stage.add(this.layer);
		var con = this.stage.container();
		con.addEventListener('dragover', e => e.preventDefault());
		document.getElementById('drag-items')?.addEventListener('dragstart', (e) => {
			//@ts-ignore
			itemURL = e.target?.src;
		});
		let namespace: any;
		let replicaSet: any;
		var itemURL = '';

		con.addEventListener('drop', (e) => {
			e.preventDefault();
			this.stage.setPointersPositions(e);


			Konva.Image.fromURL(itemURL, (image: Konva.Image) => {
				image.setAttrs({
					x: 100,
					y: 0,
					offsetX: 50,
					offsetY: 30,
					scaleX: 1,
					scaleY: 1,
				});
				if (itemURL == "http://localhost:3001/assets/ns.svg") {
					let muser = new NamespaceMutation("mycluster", "http://localhost:50051/design");
					namespace = new Namespace({
						width: 800,
						height: 500,
						stroke: 'black',
						strokeWidth: 2,
						dashEnabled: true,
						dash: ([2, 4])
					}, image);
					namespace.Group.position(this.stage.getPointerPosition());
					this.layer.add(namespace.Group);
					this.layer.batchDraw();
					muser.apply(muser.createNamespace({
						apiVersion: "v1",
						metadata: {
							name: "mynamespace",
						}
					})).then(console.log)
				} else if (itemURL == "http://localhost:3001/assets/rs.svg" && namespace != undefined) {
					let muser = new DeploymentMutation("mycluster", "http://localhost:50051/design");
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
					this.layer.batchDraw();
					muser.apply(muser.createDeployment({
						apiVersion: "v1",
						metadata: {
							name: "myDeployment",
							annotations: [
								{key: "name", value: "ReplicaSet"},
								{key: "width", value: 180},
								{key: "height", value: 100},
								{key: "stroke", value: 'black'},
								{key: "strokeWidth", value: 2},
								{key: "cornerRadius", value: 50},
								{key: "icon", value: './assets/rs.svg'}],
						},
						spec: {
							replicas: replicaSet.Containers,
							selector: {
								matchLabels: {
									app: "vegam"
								},
							},
							template: {
								metadata: {name: "Something"},
								spec: {
									name: "How many names?",
									image: "Whoa!",
									ports: {
										containerPort: "containerPort"
									}
								}
							}
						}
					})).then(console.log);
				} else if (itemURL == "http://localhost:3001/assets/svc.svg" && namespace != undefined && replicaSet != undefined) {
					image.setAttrs({
						x: this.stage.find('.ReplicaSet')[0].getParent().attrs.x - 400,
						y: this.stage.find('.ReplicaSet')[0].getParent().attrs.y - 50,
					});
					let muser = new ServiceMutation("mycluster", "http://localhost:50051/design")
					let service = new Service({
						name: "Service",
						points: [
							this.stage.find('.ReplicaSet')[0].getParent().attrs.x - 350,
							this.stage.find('.ReplicaSet')[0].getParent().attrs.y - 50,
							image.position().x,
							image.position().y
						],
						stroke: "black",
						strokeWidth: 2,
					}, image);

					replicaSet.Group.add(service.Group);
					namespace.Group.add(replicaSet.Group);
					this.layer.batchDraw();
					muser.apply(muser.createService({
						apiVersion: "v1",
						metadata: {
							name: "myService",
							annotations: [
								{key: "name", value: "Service"},
								{key: "stroke", value: 'black'},
								{key: "strokeWidth", value: 2},
								{key: "cornerRadius", value: 50},
								{key: "icon", value: './assets/svc.svg'},
								{key: "iconPositionX", value: this.stage.find('.ReplicaSet')[0].getParent().attrs.x - 400},
								{key: "iconPositionY", value: this.stage.find('.ReplicaSet')[0].getParent().attrs.y - 50}],
						}
					})).then(console.log)
				}
				else if (itemURL == "http://localhost:3001/assets/secret.svg" && namespace != undefined) {
					let secret = new Secret(image);
					image.setAttrs({
						x: 700,
						y: 0,
						offsetX: 50,
						offsetY: 30,
						scaleX: 1,
						scaleY: 1,
					});
					let isDataStored = secret.getData();
					if (isDataStored) {
						namespace.Group.add(secret.Group);
						this.layer.batchDraw();
					}
				}
				else if (itemURL == "http://localhost:3001/assets/cm.svg" && namespace != undefined) {
					let configMap = new ConfigMap(image);
					let isDataStored = configMap.storeConfig();
					if (isDataStored) {
						namespace.Group.add(configMap.Group);
						this.layer.batchDraw();
					}
				} else if (itemURL == "http://localhost:3001/assets/ing.svg" && namespace != undefined) {
					console.log(this.stage.find('.Service')[0].x());
					image.setAttrs({
						x: this.stage.find('.Service')[0].x() - 150,
						y: this.stage.find('.Service')[0].y() + 50,
					});
					let ingress = new Ingress({
						points: [
							this.stage.find('.Service')[0].x() - 98,
							this.stage.find('.Service')[0].y() + 50,
							image.position().x,
							image.position().y
						],
						stroke: "black",
						strokeWidth: 2,
					}, image);
					replicaSet.Group.add(ingress.Group);
					namespace.Group.add(replicaSet.Group);
					this.layer.batchDraw();
				}
			});
		});
	}
}