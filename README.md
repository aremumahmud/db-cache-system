# db-cache-system
This is a datastructure for caching a database which makes it a database cache system for seamlessly fast data interaction which offer up to zero time complexity. This module allows data to be changed and exported before it is written to the database to reduce time spent on i/o while the writing to the database is done in the background 

### cacheDS.loadCollection( `collection` , `document` , `callback`) / cacheDS.loadCollections(`collection` , `document` , `callback`)
This method allows the loading of documents in to the datastructure and creating a collection
lets create a bakery collection 

 ```
const cacheDs = require('./cacheDs')
let cache = new cacheDs()

let document =  [
    {
      "caketype": " synergy",
      "cakecus": "ayila",
      "_id": "Jgp2Fx70i6dLxdKGYNxF"
    },
    {
      "caketype": " synellrgy",
      "cakecus": "ayila",
      "_id": "79NwXmllctcodfgxoxs0"
    },
    {
      "caketype": " sylnergy",
      "cakecus": "ayila",
      "_id": "m64u07bYJPnw8Y6kjxe5"
    },
    {
      "caketype": " syneklrgy",
      "cakecus": "ayi;lla",
      "_id": "921S2YT1Oy1g8f822Xo1"
    },
    {
      "caketype": " syllnergy",
      "cakecus": "ayil;.a",
      "_id": "9UQC7x3q8ha3h2R0pM01"
    },
    {
      "caketype": " synergy",
      "cakecus": "ayillla",
      "_id": "9UQC7x3q8ha3h2R0pM01"
    }
 ]
 
 cache.loadCollection('bakery' , document , ()=>{
        console.log(cache.collections)
 })
 ```
 
 
### cacheDS.find(`collection` , `parameters` , `callback`)
This method allows the searching through the datastructure . it is written with speed in mind as you can search
through millions of documents and data at  T(O) = 0<x<1 where the time is noted in milliseconds 
an example can be shown as we try to find through the `bakery collection` as we pass through the parametrs for finding data with a specific id

```
 cache.loadCollection('bakery' , data , ()=>{
       // console.log(cach.collections)
        cache.find('bakery' , {_id:'79NwXmllctcodfgxoxs0'} , (err,found)=>{
            //console.log(err,found)
        })
})
```

### cacheDS.update(`collection` , `parameters` , `callback`)
