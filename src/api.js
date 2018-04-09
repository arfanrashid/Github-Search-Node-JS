import io from 'socket.io-client';
const  socket = io.connect('http://localhost:3001');

function Subscriber(cb)
{
    console.log("Subscribed for ProjectsUpdated");


}

function GetProjectsResult(params) 
{

    
 socket.emit('GetProjectsResult', params);
}
export { GetProjectsResult, Subscriber };