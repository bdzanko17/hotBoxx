const mongodb = require('mongodb').MongoClient;
const clientt = require('socket.io').listen(4000).sockets;
var connectedUsers = 0;

mongodb.connect('mongodb+srv://bdzanko1:benjo1234@cluster0-s4065.mongodb.net/test?retryWrites=true&w=majority',
function(err, client){
if(err){
    throw err;
}
console.log("MongoDB connected");
db = client.db('mongochat');



clientt.on('connection',function(socket){
    console.log("connected");
    connectedUsers++;
    socket.broadcast.emit('active',connectedUsers)
    socket.emit('active',connectedUsers)


    socket.on('disconnect', function () {
        console.log('disconnected')
        connectedUsers--;
        socket.broadcast.emit("active",connectedUsers)
    });

    let chat = db.collection('chats');
    sendStatus= function(s){
        socket.emit('status',s);
    }
    chat.find().limit(100).sort({_id:1}).toArray(function(err,res) {
      if(err){
          throw err;
      }
      console.log(res);
      socket.emit('output',res)
    });


    
    socket.on('input',function(data) {
        console.log(connectedUsers);
        let name = data.name;
        let message = data.message;

        if(name=='' || message==''){
            sendStatus('Please enter name and message');
        }else{
            chat.insert({name: name,message: message},function(){
                clientt.emit('output',[data]);

                //Send status object 
                sendStatus({
                    message:'Message sent',
                    clear:true
                });
            }); 
        }
    });

    socket.on('clear',function(data){
        //remove all chats from collection
        chat.remove({},function(){
            socket.emit('cleared');
        })
    });
    
});

});
