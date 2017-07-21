import { Component } from "@angular/core";

@Component({
    selector: "main",
    template: `
    <tool-header headerText="Color Tool"></tool-header>
    <unordered-list [items]="colors"></unordered-list>
    <color-form (onColor)="addColor($event)"></color-form>`,
})
export class AppComponent {

    public colors: string[] = [ "red", "yellow", "blue" ];

    public addColor(newColor: string) {
        this.colors = this.colors.concat(newColor);
    }

}
