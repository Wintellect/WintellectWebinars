import { Component } from "@angular/core";

import { AppStore } from "./services/app-store.service";

@Component({
    selector: "main",
    template: `
        <tool-header header="Color Tool"></tool-header>
        <item-list [items]="appStore.getColors()"></item-list>
        <color-form (onSubmitColor)="addColor($event)"></color-form>
    `,
})
export class AppComponent {

    constructor(private appStore: AppStore) { }

    public addColor(newColor: string) {
        this.appStore.addColor(newColor);
    }
}
