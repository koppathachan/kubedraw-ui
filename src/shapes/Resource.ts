import Konva from "konva";
import {Node} from "./Node";
import {DomEvent} from "./enums/DomEvent";
import {Observable, Subject} from "rxjs";
import {KonvaEventObject} from "konva/types/Node";
import {multicast, refCount} from "rxjs/operators";

export class Resource extends Node {

    delegate: Konva.Rect;
    private group: Konva.Group;
    private image: Konva.Image;
    constructor(rectConfig: Konva.RectConfig, image: Konva.Image) {
        super();
        this.group = new Konva.Group();
        this.delegate = new Konva.Rect(rectConfig);
        this.image = image;
        this.group.add(this.delegate);
        this.group.add(this.image);
    }

    get Group() {
        return this.group;
    }
    
    on = (eventName: DomEvent, handler: Function) =>
        this.delegate.on(eventName, (e) => handler(e.target))
    off = (eventName: string) => this.delegate.off(eventName);
}