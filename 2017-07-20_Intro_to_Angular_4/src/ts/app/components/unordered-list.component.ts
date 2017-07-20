import { Component, Input } from "@angular/core";

@Component({
    selector: "unordered-list",
    template: `<ul>
        <li *ngFor="let item of items">{{item}}</li>
    </ul>`
})
export class UnorderedList {

    @Input()
    public items: string[] = [];

}