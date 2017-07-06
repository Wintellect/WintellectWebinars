import { Action } from "redux";

import { ActionTypes } from "../action-types";

export interface ColorAction extends Action {
    color: string;
}

export const addColor: (color: string) => ColorAction = (color) => ({
    type: ActionTypes.AddColor,
    color,
});
