class Check {
    constructor (param){
        this.param = param
        this.results = []
    }

    verify (param , position ,  callback) {
        let keys = Object.keys(this.param)
        let query = []
        keys.forEach(key=>{ 
            if(this.param[key] == param[key]){
                query.push(true)
            }else query.push(false)
        })
        query = eval(query.join('||')) 
        if(query){
            process.nextTick(()=>callback(true))
            if(position != null){
                param.position = position.position
                param.map = position.map
                param.polarity = position.polarity
                param.lengths = position.lengths
            }
           //console.log(param)
            this.results.push(param)
        }else{
            process.nextTick(()=>callback(false))
        }
    }
}

module.exports = Check