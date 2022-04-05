import { configureStore } from '@reduxjs/toolkit';
import familyReducer from '../features/family/familySlice';
import createSagaMiddleware from "redux-saga";
import saga from "../features/family/saga.js"
let sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
    reducer: {
        family: familyReducer.reducer,
    },
    middleware: [sagaMiddleware]
});

sagaMiddleware.run(saga);
