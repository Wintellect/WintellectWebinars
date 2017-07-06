import { Reducer } from "redux";

import { AppState } from "../app-state";
import { ColorAction } from "../actions/color-actions";
import { ActionTypes } from "../action-types";

export const colorReducer: Reducer<AppState> = (
    state: AppState = { colors: [ "red", "white", "green", "blue", "yellow" ] },
    action: ColorAction,
) => {

    switch (action.type) {
        case ActionTypes.AddColor:
            // return Object.assign({}, state, { colors: state.colors.concat(action.color) } ); 
            return { ...state, colors: [ ...state.colors, action.color ] };
        default:
            return state;
    }
};
