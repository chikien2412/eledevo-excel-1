const Models = require('../model/index')
// var XLSX = require("xlsx");
const Excel = require('exceljs'); 
const fs= require('fs')
const path = require("path");

exports.getItem = async (req , res , next) => {
    try {
        const listData = await Models.find({}).select('-__v')
        res.send({listData})
    } catch (error) {
        res.send(error)
    }
}

exports.addExcel = async (req , res , next) => {
    try {
        let file = req.files
        const workbook = new Excel.Workbook();
        const a = await workbook.xlsx.readFile(file[0].path);
        console.log(a,'workbook o day')
        let jsonData = [];
         workbook.worksheets.forEach(function(sheet) {
        // read first row as data keys
        let firstRow = sheet.getRow(1);
        if (!firstRow.cellCount) return;
        let keys = firstRow.values;
        sheet.eachRow((row, rowNumber) => {
            if (rowNumber == 1) return;
            let values = row.values
            let obj = {};
            for (let i = 1; i < keys.length; i ++) {
                obj[keys[i]] = values[i];
            }
            jsonData.push(obj);
        })

    });
    console.log(jsonData);
        // let wb = XLSX.readFile(file[0].path) 
        // let ws = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])

         Models.insertMany(jsonData, (error, data) => {
            console.log(data , 'aaaaaaaaaa')
            res.send({jsonData , message: "Success"})
        })
        
          
    } catch (error) {   
        res.send(error) 
    }
}

exports.addItem = async (req , res , next) => {
    try {
        const listData = await Models.create({name : req.body.name, day: req.body.day, position: req.body.position, time: req.body.time })
        res.send({listData})
    } catch (error) {
        res.send(error)
    }
}

exports.deleteItem = async (req , res , next) => {
    try {
        await Models.findByIdAndDelete(req.params.id)
        res.send({}) 
    } catch (error) {
        res.send(error)
    }
}
exports.updateItem = async (req , res , next) => {
    try {
        await Models.findByIdAndUpdate(req.param.id , {name : req.body.name, day: req.body.day, position: req.body.position, time: req.body.time })
        res.send({})
    } catch (error) {
        res.send(error)
    }
}

exports.paginateItem = async(req, res, next) => {
    try {
        const limit = parseInt(req.query.limit)
        const activePage = parseInt(req.query.activePage)
        const skip = (activePage - 1)*limit
        const totalRecord = await Models.countDocuments({})
        const totalPage = Math.ceil(totalRecord / limit)
        const listData = await Models.find({}).select('-__v').skip(skip).limit(limit)
        res.send({listData , totalPage})
    } catch (error) {
        res.send({error : error})
    }
}

exports.searchItem = async(req, res, next) => {
    try {
        const name = req.query.textSearch
        const limit = parseInt(req.query.limit)
        const activePage = parseInt(req.query.activePage)
        const skip = (activePage - 1)*limit
        const totalRecord = await Models.countDocuments({name : {$regex : name  , $options : 'i'}})
        const totalPage = Math.ceil(totalRecord / limit)
        const listData = await Models.find({name : {$regex : name  , $options : 'i'}}).skip(skip).limit(limit)
        res.send({listData , totalPage})
    } catch (error) {
        res.send({error : error})
    }
}

