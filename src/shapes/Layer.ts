import Konva from "konva";
import {Node} from "./Node";
import {Position} from "./Position";

export class Layer extends Node {
        delegate: Konva.Layer;

        constructor(config?: Konva.LayerConfig) {
                super();
                this.delegate = new Konva.Layer(config);
        }

        getPointerPosition = (pos: Position) => {
                const pointerPosition = this.delegate.getAbsoluteTransform()
                        .copy().invert().point(pos);
                return new Position(pointerPosition.x, pointerPosition.y);
        }
        batchDraw = () => this.delegate.batchDraw();
}
