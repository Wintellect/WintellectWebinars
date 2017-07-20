import { Component, Input } from "@angular/core";

@Component({
    selector: "tool-header",
    template: `<header>
        <h1>{{headerText}}</h1>
    </header>`,
})
export class ToolHeader {

    @Input()
    public headerText: string = "";

}