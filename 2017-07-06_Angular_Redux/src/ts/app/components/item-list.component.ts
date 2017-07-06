import { Component, Input } from "@angular/core";

@Component({
    selector: "item-list",
    template: `<ul>
        <li *ngFor="let item of items">{{item}}</li>
    </ul>`,
})
export class ItemList {

    @Input()
    public items: string[];
}
