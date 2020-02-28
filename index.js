var mysql = require('mysql');
const util = require('util');

var connection = mysql.createConnection({
  socketPath  : process.env.host,
  user     : process.env.user,
  password : process.env.password,
  database : process.env.database
});

exports.showcount = async (req, res) => {
  let query = "SELECT count_view FROM view"
  let query_engine =  util.promisify(connection.query).bind(connection);
  let result = await query_engine(query)
  
  if (result[0] == "NULL"){
    query = "INSERT INTO view (page_view) VALUES (1)"
    result = 1
  } else {
    result = result[0]['count_view'] + 1
    query = `UPDATE view SET count_view = ${result};`
  }
  await query_engine(query)
res.status(200).send(`${result}`);
};