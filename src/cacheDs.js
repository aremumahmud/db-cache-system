const Classify = require("./classify")
const Check = require('../../twinSearch/src/check')
const twinSearch = require('../../twinSearch')
const update = require('./update')
const deleteData = require('./delete')

class cacheDs {
    constructor(){
        this.collections = {}
    }

    loadCollection (collection , data , callback){
        this.collections[collection] = {}
        let keys = Object.keys(data[0])
        keys.forEach(key=>{
            this.collections[collection][key] = Classify(key , data)
        })
        process.nextTick(()=>callback())
    }

    loadCollections (datas , callback){
        let collections = Object.keys(datas)
        collections.forEach( collection=>{
            this.loadCollection(collection , datas[collection])
        })
        process.nextTick(()=>callback())
    }

    find(collection , param , callback){
        let check = new Check(param)
        let collection_data = this.collections[collection]
        let param_keys = Object.keys(param)
        if(param_keys.length == 1){
            let collection_deep = collection_data[param_keys[0]]
            let found = collection_deep[param[param_keys[0]]]
            process.nextTick(()=>callback(null , found))
        }else if (param_keys.length > 1){
            let collection_deep = collection_data[param_keys[0]]
            let found = collection_deep[param[param_keys[0]]]
            if(found.constructor.name == 'Object'){
                check.verify(found)
                process.nextTick(()=>callback(null , check.results ))
            }else if(found.constructor.name == 'Array'){
                twinSearch({data : found , name : param_keys[0]} , param , callback)
            }else if(found == undefined){
                process.nextTick(()=>callback({error:true,errtype : 'not found'} , null))
            }
        }
    }

    add(collection , data , callback){
        let collection_data = this.collections[collection]
        let keys = Object.keys(data)
        keys.forEach(key=>{
            let specific_collection_data = collection_data[key]
            if(specific_collection_data[data[key]].constructor.name == 'Object'){
                let temp_data = specific_collection_data[data[key]]
                specific_collection_data[data[key]] = []
                specific_collection_data[data[key]].push(temp_data)
                specific_collection_data[data[key]].push(data)
            }else if(specific_collection_data[data[key]].constructor.name == 'Array'){
                specific_collection_data[data[key]].push(data)
            }else if(specific_collection_data[data[key]] == undefined){
                specific_collection_data[data[key]] = data
            }

        })
        process.nextTick(()=>callback(null , data))
    }

    update(collection , param , callback){
        let check = new Check(param.find)
        let collection_data = this.collections[collection]
        let param_keys = Object.keys(param.find)
        if(param_keys.length == 1){
            console.log('array1')
            let collection_deep = collection_data[param_keys[0]]
            let found = collection_deep[param.find[param_keys[0]]]
            if(found.constructor.name == 'Object'){
                check.verify(found , null , function(bool){
                    if(bool){
                        update(collection ,this , found , param.updateWith , null , callback)
                    }
                })
               // process.nextTick(()=>callback(null , check.results ))
            }else if(found.constructor.name == 'Array'){
                console.log('array3')
                twinSearch({data : found , name : param_keys[0]} , param.find , (err ,data)=>{
                    update(collection ,this, data , param.updateWith , param.find[param_keys[0]] , callback)
                })
            }else if(found == undefined){
                process.nextTick(()=>callback({error:true,errtype : 'not found'} , null))
            }
            //process.nextTick(()=>callback(null , found))
        }else if (param_keys.length > 1){
            console.log('array2')
            let collection_deep = collection_data[param_keys[0]]
            let found = collection_deep[param.find[param_keys[0]]]
            if(found.constructor.name == 'Object'){
                check.verify(found , null , function(bool){
                    if(bool){
                        update(collection ,this , found , param.updateWith , null , callback)
                    }
                })
               // process.nextTick(()=>callback(null , check.results ))
            }else if(found.constructor.name == 'Array'){
                console.log('array3')
                twinSearch({data : found , name : param_keys[0]} , param.find , (err ,data)=>{
                    update(collection ,this, data , param.updateWith , param.find[param_keys[0]] , callback)
                })
            }else if(found == undefined){
                process.nextTick(()=>callback({error:true,errtype : 'not found'} , null))
            }
        }
    }

    delete(collection , param , callback){
        let check = new Check(param)
        let collection_data = this.collections[collection]
        let param_keys = Object.keys(param)
        if(param_keys.length == 1){
            let collection_deep = collection_data[param_keys[0]]
            let found = collection_deep[param[param_keys[0]]]
            deleteData(found)
            //process.nextTick(()=>callback(null , found))
        }else if (param_keys.length > 1){
            let collection_deep = collection_data[param_keys[0]]
            let found = collection_deep[param[param_keys[0]]]
            if(found.constructor.name == 'Object'){
                check.verify(found , null , function(bool){
                    if(bool){
                        deleteData(found)
                    }
                })
                //process.nextTick(()=>callback(null , check.results ))
            }else if(found.constructor.name == 'Array'){
                twinSearch({data : found , name : param_keys[0]} , param.find , (err ,data)=>{
                    deleteData(collection ,this,data , param.find[param_keys[0]])
                })
            }else if(found == undefined){
                process.nextTick(()=>callback({error:true,errtype : 'not found'} , null))
            }
        }
    }
}

module.exports = cacheDs