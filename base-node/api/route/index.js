const ItemController = require('../controller/index')

const routers = (app) => {
    app.route('/item')
    .get(ItemController.getItem)
    .post(ItemController.addItem)
    app.route('/item/excel').post(ItemController.addExcel)
    app.route('/item/:id')
    .delete(ItemController.deleteItem)
    .put(ItemController.updateItem)
    app.route('/item/search')
    .get(ItemController.searchItem)
    app.route('/item/paginate')
    .get(ItemController.paginateItem)
}

module.exports = routers