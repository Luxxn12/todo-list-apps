/* eslint-disable @typescript-eslint/no-explicit-any */
import * as actions from "@/lib/actions/taskActions";
import * as api from "@/lib/api/taskApi";
import type { RootState } from "@/lib/store";
import type { Task } from "@/lib/types";
import { all, call, put, select, takeLatest } from "redux-saga/effects";

function* fetchTasksSaga() {
  try {
    const tasks: Task[] = yield call(api.fetchTasksApi);
    yield put(actions.fetchTasksSuccess(tasks));
  } catch (error: any) {
    yield put(actions.fetchTasksFailure(error.message));
  }
}

function* addTaskSaga(action: ReturnType<typeof actions.addTask>) {
  try {
    const task: Task = yield call(api.addTaskApi, action.payload);
    yield put(actions.addTaskSuccess(task));
  } catch (error : any) {
    yield put(actions.addTaskFailure(error.message));
  }
}

function* toggleTaskCompletionSaga(
  action: ReturnType<typeof actions.toggleTaskCompletion>
) {
  try {
    const id = action.payload;
    const state: RootState = yield select();
    const task = state.tasks.tasks.find((t) => t.id === id);

    if (!task) {
      throw new Error("Task not found");
    }

    const result: { id: string; completed: boolean } = yield call(
      api.toggleTaskCompletionApi,
      id,
      !task.completed
    );

    yield put(actions.toggleTaskCompletionSuccess(result.id, result.completed));
  } catch (error : any)  {
    yield put(
      actions.toggleTaskCompletionFailure(error.message, action.payload)
    );
  }
}

function* updateTaskSaga(action: ReturnType<typeof actions.updateTask>) {
  try {
    const updatedTask: Task = yield call(api.updateTaskApi, action.payload);
    yield put(actions.updateTaskSuccess(updatedTask));
  } catch (error: any) {
    yield put(actions.updateTaskFailure(error.message, action.payload.id));
  }
}

function* deleteTaskSaga(action: ReturnType<typeof actions.deleteTask>) {
  try {
    const id: string = yield call(api.deleteTaskApi, action.payload);
    yield put(actions.deleteTaskSuccess(id));
  } catch (error: any) {
    yield put(actions.deleteTaskFailure(error.message, action.payload));
  }
}

function* watchFetchTasks() {
  yield takeLatest(actions.FETCH_TASKS, fetchTasksSaga);
}

function* watchAddTask() {
  yield takeLatest(actions.ADD_TASK, addTaskSaga);
}

function* watchToggleTaskCompletion() {
  yield takeLatest(actions.TOGGLE_TASK_COMPLETION, toggleTaskCompletionSaga);
}

function* watchUpdateTask() {
  yield takeLatest(actions.UPDATE_TASK, updateTaskSaga);
}

function* watchDeleteTask() {
  yield takeLatest(actions.DELETE_TASK, deleteTaskSaga);
}

export default function* rootSaga() {
  yield all([
    watchFetchTasks(),
    watchAddTask(),
    watchToggleTaskCompletion(),
    watchUpdateTask(),
    watchDeleteTask(),
  ]);
}
