import rootSaga from "@/lib/sagas";
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import taskReducer from "./reducers/taskReducer";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
