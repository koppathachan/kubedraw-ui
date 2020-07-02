import Konva from "konva";
import {Node} from "./Node";

export class ClusterStage extends Node {
        delegate: Konva.Stage;

        constructor(config?: any) {
                super();
                this.delegate = new Konva.Stage(config);
        }

        batchDraw = () => this.delegate.batchDraw();

        getPointerPosition = () => {
                return this.delegate.getPointerPosition();
        }

        container = () => {
            return this.delegate.container();
        }

        setPointersPositions(e: any) {
            this.delegate.setPointersPositions(e);
        }
}
