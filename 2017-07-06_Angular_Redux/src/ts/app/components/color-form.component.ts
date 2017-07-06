import { Component, Output, EventEmitter } from "@angular/core";

@Component({
    selector: "color-form",
    template: `<form>
        <div>
            <label for="new-color-input">New Color:</label>
            <input type="text" [(ngModel)]="newColor" name="newColorInput">
        </div>
        <button type="button" (click)="submitColor()">Submit Color</button>
    </form>`,
})
export class ColorForm {

    public newColor: string;

    @Output()
    public onSubmitColor = new EventEmitter<string>();

    public submitColor() {
        this.onSubmitColor.emit(this.newColor);
        this.newColor = "";
    }
}
