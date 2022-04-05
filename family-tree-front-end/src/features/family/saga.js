import { call, takeEvery, put } from "redux-saga/effects";
import familyTreeSlice from "./familySlice";
import {sagaActions} from "./actions/actions.js";
import { getFamily, createMember, deleteMember, updateMember } from "../../endpoints/api.js"

export function* fetchData({payload}) {
  try {
    let result = yield call(() => getFamily());
    yield put(familyTreeSlice.actions.getFamily(result));
  } catch (e) {
    yield put({ type: "TODO_FETCH_FAILED" });
  }
}

export function* _createMember({payload}) {
    try {
        let result = yield call(() => createMember(payload));
        yield put(familyTreeSlice.actions.updateFamily(result));
    } catch (e) {
    yield put({ type: "TODO_FETCH_FAILED" });
    }
}

export function* _updateMember({payload}) {
    try {
        let result = yield call(() => updateMember(payload));
        yield put(familyTreeSlice.actions.updateMember(result));
    } catch (e) {
    yield put({ type: "TODO_FETCH_FAILED" });
    }
}

export function* _deleteMember({payload}) {
    try {
        let result = yield call(() => deleteMember(payload));
        yield put(familyTreeSlice.actions.deleteMember(result));
    } catch (e) {
        yield put({ type: "TODO_FETCH_FAILED" });
    }
}

export default function* rootSaga() {
  yield takeEvery(sagaActions.FETCH_FAMILY_DATA, fetchData);
  yield takeEvery(sagaActions.CREATE_USER, _createMember);
  yield takeEvery(sagaActions.DELETE_USER, _deleteMember);
  yield takeEvery(sagaActions.UPDATE_USER, _updateMember);
}
