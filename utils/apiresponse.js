  const apiresponse = (statuscode,  message ='Success', data =[], key="data") =>{
         return {
            statuscode,
            message,
            [key]: data
         }
   }
module.exports =  { apiresponse};
