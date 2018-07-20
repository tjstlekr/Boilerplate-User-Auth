exports.signUp = function (session, userMap) {
 return function (request, response) {
  let result = {}
  var data;
  result.version = 1;
  let bodyParameter = request.body;

  //  TO DO : identify bad request
  if (bodyParameter.userName == null || bodyParameter.userName === '' || bodyParameter.userName == undefined) {
   sendErrorResponse(400, 'bad request. send username');
   return;
  } else if (bodyParameter.email == null || bodyParameter.email === '' || bodyParameter.email == undefined) {
   sendErrorResponse(400, 'bad request. send email address');
   return;
  } else if (bodyParameter.password == null || bodyParameter.password === '' || bodyParameter.password == undefined) {
   sendErrorResponse(400, 'bad request parameter. send password');
   console.log('return was required');
   return;
  } else {
   // all the must parameters are received from client proceed to registration
   registrationProcess()
   // let rg = registrationProcess()
   // console.log(rg.next());
  }

// TO DO:
// 1. validate if username is taken
// 2. if not taken registers the users
// 3. if taken send error
  async function registrationProcess() {
   try {
    // sql query
    let sqlQuery = 'select * from user where username = "'+ bodyParameter.userName +'"'

    // TO DO: perform sql query and save database response
    let databaseResponse =await executeQuery(sqlQuery);
    console.log('databaseResponse:\t'+databaseResponse);

    // TO DO: check if user is already present in database using database response
    // if username is taken isTaken will be true otherwise false
    const isTaken =await processQueryData(databaseResponse);

    // TO DO: send error to user and ask to try registration with another username
    if (isTaken == true) {
     sendErrorResponse(400, 'username already taken. try with another username')
     console.log('return was much needed');
     return;
    } else {
     // TO DO: register user
     // sql query
     let sqlQuery = 'insert into user (first_name, last_name, username, dob, email, password) VALUES ("'+ bodyParameter.firstName +'", "'+ bodyParameter.lastName+'","'+bodyParameter.userName+'", "'+bodyParameter.dob+'", "'+bodyParameter.email+'", "'+ bodyParameter.password +'")';

     // TO DO: perform sql query on database
     let databaseResponse = await executeQuery(sqlQuery)

     //  TO DO: check database update response
     const registrationSuccess = await processQueryData(databaseResponse)

     // TO DO : check if registration was successful
     if (registrationSuccess === false) {
      sendErrorResponse(500,'failed to process your request at this time');
     } else {
      // TO DO : user registration success
      sendSuccessResponse()
     }
    }
   } catch (error){
    console.log(error);
   }
  }

// TO DO: perform sql queries and returns data
// select query returns array of object
// insert or update query return an object
 async function executeQuery (sqlQuery) {
  let data;
  let query = await session.executeSql(sqlQuery)
  .then(output => {
   data = output;
  })
  .catch(function (error) {
   console.log(error);
  });
  console.log('returning data  '+data);
  return data;
 }



// based on array of Objects or Object process the data and based on logic indicate logic for next step
   function processQueryData (data) {
   if (data[0].length > 0) {
    // user exists
     return  true;
   } else if (data[0].length == 0) {
    // no data found in database for received username
     return false;
   } else if (data.affectedRows == 0) {
    // data update, insert operation failed
    return false;
   } else if (data.affectedRows !== 0 ) {
    // means database has been affected i.e. query performed
    return true;
   }
  }

// send successful response to client
  function sendSuccessResponse () {
   result.status = 201;
   result.code = 1;
   result.message = 'User created successfully';
   result.data = request.body;
   response.send(JSON.stringify(result))
   return;
  }

// send error response to client
  function sendErrorResponse (status, message) {
   result.status = status;
   result.code = 0;
   result.message = message;
   result.data = []
   response.send(JSON.stringify(result))
   return;
  }

 }
}
