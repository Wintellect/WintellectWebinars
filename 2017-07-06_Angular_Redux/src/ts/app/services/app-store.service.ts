import { Injectable } from "@angular/core";
import { createStore, Store } from "redux";

import { AppState } from "../app-state";
import { colorReducer } from "../reducers/color-reducer";
import { addColor } from "../actions/color-actions";

@Injectable()
export class AppStore {

    private appStore: Store<AppState>;

    constructor() {
        this.appStore = createStore<AppState>(colorReducer);
    }

    public getColors() {
        return this.appStore.getState().colors;
    }

    public addColor(newColor: string) {
        this.appStore.dispatch(addColor(newColor));
    }

}
