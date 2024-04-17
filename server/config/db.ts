let LOCAL = false;

let HostName, URI;

if(LOCAL){
    URI = "mongodb://localhost/contacts";
    HostName = "localhost";
}
else{
    URI = "mongodb+srv://takiruls:RJlSX8uoZ8SXzqH2@cluster0.xrns1e7.mongodb.net/contacts?retryWrites=true&w=majority&appName=Cluster0";
    HostName = "MongoDB Atlas";
}

export {URI, HostName}

export const SessionSecret = "INFT2202SessionSecret";
