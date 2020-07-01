import {Component, OnInit} from '@angular/core';
import Konva from 'konva';

let itemURL: any = '';
@Component({
    selector: 'app-side-nav',
    templateUrl: './side-nav.component.html',
    styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
    stage: Konva.Stage;
    layer: Konva.Layer;
    ngOnInit() {
        this.stage = new Konva.Stage({
            container: 'container',
            width: 1500,
            height: 1500
        });
        this.layer = new Konva.Layer();
        this.stage.add(this.layer);
        console.log('TEST', document.getElementById('drag-items'));
        document
            .getElementById('drag-items')
            .addEventListener('dragstart', (event) => {
                itemURL = event.target.src;
            });

        const con = this.stage.container();
        con.addEventListener('dragover', (event) => {
            event.preventDefault(); // !important
        });

        con.addEventListener('drop', (event) => {
            event.preventDefault();
            this.stage.setPointersPositions(event);

            Konva.Image.fromURL(itemURL, (image) => {
                image.setAttrs({
                    scaleX: 0.2,
                    scaleY: 0.2,
                });
                this.layer.add(image);

                image.position(this.stage.getPointerPosition());
                image.draggable(true);
                this.layer.draw();
            });
        });
    }
}
