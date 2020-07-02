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
        let container = prompt("How many pods?", "0");
        for (let it = 0; it < Number(container); it++) {
            let pod: any;
            Konva.Image.fromURL('./assets/pod.svg', function (darthNode: Konva.Image) {
                darthNode.setAttrs({
                    scaleX: 0.5,
                    scaleY: 0.5,
                });
                pod = new Pod({}, darthNode);
            });
            this.Group.add(pod);
        }
    }

}