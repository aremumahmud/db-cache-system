function update (collection , main , data , tobeUpdatedWith , name ,  callback){
   // console.log(arguments)
   // console.log(data , 'll')
    if (data.constructor.name == 'Object'){
        let keys = Object.keys(tobeUpdatedWith)
        keys.forEach(key=>{
            if(key == 'position' || key == 'map' ||key == 'polarity' ||key == 'lengths' ){
                return
            }else{
                 data[key] = tobeUpdatedWith[key]
            }
           
        })
        process.nextTick(()=>callback(null , data))
    }else if (data.constructor.name == 'Array'){
        data.forEach(data_single=>{
            let data_position = data_single.polarity == 'positive'?data_single.position:(data_single.position + data_single.lengths)
            let position = main.collections[collection][data_single.map][name][data_position]
            let keys = Object.keys(tobeUpdatedWith)
            keys.forEach(key=>{
                if(key == 'position' && key == 'map' &&key == 'polarity' && key == 'lengths' ){
                    return
                }else{
                    position[key] = tobeUpdatedWith[key]
                }
            })
        })
        process.nextTick(()=>callback(null ,'position'))
    }
    
}


module.exports = update