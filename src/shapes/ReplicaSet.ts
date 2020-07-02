import Konva from "konva";
import {DomEvent} from "./enums/DomEvent";
import {Resource} from "./Resource";
import {Pod} from "./Pod";

export class ReplicaSet extends Resource {

    constructor(rectConfig: Konva.RectConfig, image: Konva.Image) {
        super(rectConfig, image);
        this.Group.draggable(true);
    }

    on = (eventName: DomEvent, handler: Function) =>
        this.delegate.on(eventName, (e) => handler(e.target))
    off = (eventName: string) => this.delegate.off(eventName);

    addPods() {
        let containers = prompt("How many pods?", "0");
        // let podGroup = new Konva.Group();
        Konva.Image.fromURL("./assets/pod.svg",  (darthNode: Konva.Image) => {
            darthNode.setAttrs({
                x: 200,
                y: 50,
                scaleX: 0.5,
                scaleY: 0.5,
            });

            for (let it = 0; it < Number(containers); it++) {
                let pod: Pod = new Pod({}, darthNode);
                this.Group.add(pod.Group);
            }
        })
    }           
}