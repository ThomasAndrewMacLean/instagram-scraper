const ApiBuilder = require('claudia-api-builder'),
    AWS = require('aws-sdk');
AWS.config.update({ region: 'eu-west-1' });
var api = new ApiBuilder(),
    dynamoDb = new AWS.DynamoDB.DocumentClient();

const getData = require('./data-fetcher.js');

// const data = getData('reena_riot');
// console.log(data);
// data.then(x => {
//   console.log(x.length);

//   x.forEach(element => {
//     var params = {
//       TableName: 'icecreams',
//       Item: element,
//     };
//     // console.log(params);
//     dynamoDb.put(params, function(err, data) {
//       if (err) console.log(err);
//       else console.log('data, ', data);
//     });
//   });
// });

api.post('/saveInstagram/{name}', function(request) {
    const name = request.pathParams.name;

    const data = getData(name);
    return data.then(x => {
        return Promise.all(
            x.map(element => {
                var params = {
                    TableName: 'icecreams',
                    Item: element
                };
                // console.log(params);
                return dynamoDb.put(params, function(err, data) {
                    if (err) console.log(err);
                    else return 'data';
                });
            })
        );
    });
}); // returns HTTP status 201 - Created if successful

api.get('/instagram/{name}', function(request) {
    const name = request.pathParams.name;
    // GET all users
    return dynamoDb
        .scan({ TableName: 'icecreams' })
        .promise()
        .then(response =>
            response.Items.filter(i => i.instagramAccount === name)
        );
});

api.get('/test/{name}', function(request) {
    const name = request.pathParams.name;
    const data = getData(name);
    return data;
});

module.exports = api;
