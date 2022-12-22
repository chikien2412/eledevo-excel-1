import {takeEvery , put } from "redux-saga/effects"
import callAPI from '../fetchAPIs/ItemAPI'
import * as actions from '../actions/ItemAction'
import * as types from '../constants'
import importAPI from '../fetchAPIs/importExcel'
 

function * getItem() {
    try {
        const res = yield callAPI("GET" , '')
        yield put(actions.getSuccess({
            listData : res.listData
        }))

    } catch (error) {
        yield put(actions.getFailure(error))
    }
}

function * addItem(action) {
    try {
        yield callAPI('POST' , "" , action.payload)
        yield put(actions.addSuccess())
        yield put(actions.getRequest())
    } catch (error) {
        yield put(actions.addFailure(error))
    }
}

function * addExcel(action) {
    try {
        console.log(action.payload.file, 'saga')
        const formData = new FormData();
        formData.append('file' , action.payload.file[0])
        yield importAPI('POST' , "/excel" , formData)
        yield put(actions.addExcelSuccess())
        yield put(actions.getRequest())
    } catch (error) {
        yield put(actions.addFailure(error))
    }
}

function * deleteItem(action) {
    try {
        yield callAPI('DELETE' , `/${action.payload.id}` , "")
        yield put(actions.deleteSuccess())
        yield put(actions.getRequest())
    } catch (error) {
        yield put(actions.deleteFailure(error))
    }
}



function * updateItem(action) {
    try {
        yield callAPI('PUT' , `/${action.payload.id}` , action.payload)
        yield put(actions.updateSuccess())
        yield put(actions.getRequest())
    } catch (error) {
        yield put(actions.updateFailure(error))
    }
}

function * Paginate (action) {
    try {
        const res =yield callAPI('GET' , `/paginate?activePage=${action.payload}&limit=${types.LIMIT}`)
        if(res.totalPage === 0) {
            res.totalPage =1
        }
        yield put(actions.paginateSuccess({
            listData : res.listData,
            totalPage : res.totalPage,
            activePage : action.payload
        }))
    
    } catch (error) {
        yield put(actions.paginateFailure(error))
    }
}


function * Search (action) {
    try {
        const res =yield callAPI('GET' , `/search?activePage=${action.payload.activePage}&limit=${types.LIMIT}&textSearch=${action.payload.textSearch}`)
        if(res.totalPage === 0) {
            res.totalPage =1
        }
        yield put(actions.searchSuccess({
            listData : res.listData,
            totalPage : res.totalPage,
            activePage : action.payload.activePage,
            textSearch : action.payload.textSearch
        }))
    
    } catch (error) {
        yield put(actions.searchFailure(error))
    }
}

const ItemSaga = [
    takeEvery(types.GET_ITEMS_REQUEST, getItem),
    takeEvery(types.ADD_ITEMS_REQUEST, addItem),
    takeEvery(types.ADD_EXCEL_REQUEST, addExcel),
    takeEvery(types.DELETE_ITEMS_REQUEST, deleteItem),
    takeEvery(types.UPDATE_ITEMS_REQUEST, updateItem),
    takeEvery(types.PAGINATE_ITEMS_REQUEST , Paginate),
    takeEvery(types.SEARCH_ITEMS_REQUEST , Search),
]

export default ItemSaga