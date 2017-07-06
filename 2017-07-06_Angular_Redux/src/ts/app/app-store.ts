import { createStore } from "redux";

import { AppState } from "./app-state";
import { colorReducer } from "./reducers/color-reducer";

export const appStore = createStore<AppState>(colorReducer);
