  const apiresponse = (statuscode='200',  message ='Success', data =[], key="data") =>{
         return {
            statuscode,
            message,
            [key]: data
         }
   }


module.exports =  { apiresponse};
