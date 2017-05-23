require('assert');

let multichain = require("multichain-node")({
  port: 6492,
  host: '127.0.0.1',
  user: "multichainrpc",
  pass: "8xcYsbSMyShELoPR5oNG73DtxqF7dZanwtMNVTTduGLK"
});

function getChainInfo(){
  multichain.getInfo((err, info) => {
    if(err){
      throw err;
    }
    console.log(info);
  });
}

function listStreams(){
  multichain.listStreams((err,info)=>{
   if(err){
    console.log(err);
    throw err;
  }
  console.log(info)
})
}

function getBlockHash(){
  multichain.getBlockHash({height: 1}, (err, blockHash) => {
        //assert(blockHash, "Could not get block hash at height 1");
        
        console.log("TEST: GET BLOCK")
        multichain.getBlock({hash: blockHash}, (err, block) => {
         //   assert(block, "Could not get block from hash")
         console.log("TEST: GET BLOCK")
       })
      })
}


function listStreamKeys(){
  //stream1 = "stream1"
  multichain.listStreamKeys(
   [stream],
   (err,info)=>{
    if(err){
     console.log(err);
     throw err;
   }
   console.log("Listing Stream Items")
   for(key in info){
    console.log("\n" + "Key:"+ info[key].key + "\n");
  }
})
}

function listStreamKeyItems(stream,key){
  multichain.listStreamKeyItems(
    [stream,key],(err,info)=>{
      if(err){
        console.log(err);
        throw err;
      }
      console.log("Value for key: "+ key)
      
      for(item in info){
        console.log(info[item].data)
      }
      
      data = new Buffer(info[0].data, 'hex').toString('utf8');
      data = JSON.parse(data);
      console.log("In ASCII " + data + "\n")
      for(key in data){
        console.log(key + " " + data[key]);
      }
    })
}


function publishDataToStream(stream,key,data){
  dataHex = convertJsonToHex(data);
  multichain.publish(
    [stream,key,dataHex],(err,info)=>{
     if(err){
      console.log(err);
      throw err;
    }
    console.log(info);
  })
}


function convertJsonToHex(obj){
  obj = JSON.stringify(obj);
  hex = new Buffer(obj, 'utf8').toString('hex');
  return hex;
}

//getChainInfo();
//listStreamKeys();
stream = "stream1";
key = "key3"
//listStreamKeyItems(stream,key);

obj = {
  "key1":"value1",
  "key2":"value2",
  "key3":"value3",
  "key4":"value4",
  "key5":"value5"
}



console.log(obj.toString('hex'))
dataHex = "277b226b657931223a2276616c756531222c226b657932223a2276616c756532222c226b657933223a2276616c756533222c226b657934223a2276616c756534227d27"

//publishDataToStream(stream,"key4",obj);
listStreamKeyItems("stream1","key4")