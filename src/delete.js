function deleteData (collection , main , data , name ,  callback){
    if(arguments.length == 2){
        data = arguments[0]
        callback = arguments[1]
    }
    if (data.constructor.name == 'Object'){
        delete data
        process.nextTick(()=>callback(null , data))
    }else if (data.constructor.name == 'Array'){
        data.forEach(data_single=>{
            let data_position = data_single.polarity == 'positive'?data_single.position:(data_single.position + data_single.lengths)
            let position = main.collections[collection][data_single.map][name][data_position]
            delete position
        })
        process.nextTick(()=>callback(null ,position))
    }
    
}


module.exports = deleteData