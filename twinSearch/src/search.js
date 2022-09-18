let Check = require('./check')

function twinSearch (road , param , callback){
    let check = new Check(param)
    let found = false
    if (road.data.length % 2 == 0){road.data.push({})} 
    let search1 = road.data
    let search2 = road.data.reverse()
    for (let i =0 ; i < road.data.length ; i++){
        check.verify(search1[i] , {position : i , map : road.name, polarity : 'positive' , lengths : road.data.length } , ()=>{})
       // check.verify(search2[i] ,  {position : (-1 * i) , map : road.name , polarity : 'negative' , lengths : road.data.length}, ()=>{})
    }
   // console.log(check.results  , 'results')
    process.nextTick(()=>callback(null , check.results))
    return check.results
}


module.exports = twinSearch