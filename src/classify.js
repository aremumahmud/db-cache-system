function Classify(data_class , datas){
    var classified = {}
    datas.forEach(data=>{
        if(classified[data[data_class]] == undefined){
            classified[data[data_class]] = data
        }else if(classified[data[data_class]].constructor.name == 'Array'){
            classified[data[data_class]].push(data)
        }else if(classified[data[data_class]].constructor.name == 'Object'){
            let class_data = classified[data[data_class]]
            classified[data[data_class]] = []
            classified[data[data_class]].push(class_data)
            classified[data[data_class]].push(data)
        }
    })

    return classified

}

module.exports = Classify