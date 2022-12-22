import { all } from 'redux-saga/effects';
import ItemSaga from "./ItemSaga"
export default function* rootSaga() {
  yield all([
    ...ItemSaga
  ]);
}