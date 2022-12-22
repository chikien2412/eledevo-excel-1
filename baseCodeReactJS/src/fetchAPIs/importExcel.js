let obj = {};

export default function dataAPI(method , path , data) {
    if(method === 'GET' || method === 'DELETE') {
        obj = {method};
    }else {
        obj ={
            method ,
            body : data
        }
    }
    return new Promise(function(resolve, reject) {
        const url = "http://localhost:3001/item" + path ;
        fetch(url, obj)
        .then((response) => resolve(response.json()))
        .catch((err) => reject(err))
    })
}