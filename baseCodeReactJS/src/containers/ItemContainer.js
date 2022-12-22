import React, { Component } from 'react';
import Items from '../components/Items'
import * as actions from '../actions/ItemAction'
import {connect} from 'react-redux'

class ItemContainer extends Component {
    componentDidMount() {
        this.props.paginateItems(1);
    }
    render() {
        return (
            <div>
                <Items {...this.props}/>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        items: state.items.listItem,
        totalPage: state.items.totalPage,
        activePage: state.items.activePage,
        textSearch: state.items.textSearch,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getItems: (action) => {
            dispatch(actions.getRequest(action))
        },
        addItems: (action) => {
            dispatch(actions.addRequest(action))
        },
        addExcelItems: (action) => {
            dispatch(actions.addExcelRequest(action))
        },
        deleteItems: (action) => {
            dispatch(actions.deleteRequest(action))
        },
        updateItems: (action) => {
            dispatch(actions.updateRequest(action))
        },
        paginateItems: (data) => {
            dispatch(actions.paginateRequest(data));
          },
          searchItems: (data) => {
            dispatch(actions.searchRequest(data));
          },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemContainer)