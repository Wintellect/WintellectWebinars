import { Component, Output, EventEmitter } from "@angular/core";

@Component({
    selector: "color-form",
    template: `<form>
        <div>
            <label for="new-color-input">New Color</label>
            <input type="text" id="new-color-input"
                [(ngModel)]="newColor" name="newColorInput">
        </div>
        <button type="button" (click)="saveColor()">Add Color</button>
    </form>`,
})
export class ColorForm {

    public newColor: string = "";

    @Output()
    public onColor = new EventEmitter<string>();

    public saveColor() {
        this.onColor.emit(this.newColor);
        this.newColor = "";
    }


}