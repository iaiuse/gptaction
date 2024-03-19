// /api/query.js
const mysql = require('mysql');
const util = require('util');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { host, user, password, database, query } = req.body;

  const connection = mysql.createConnection({
    host,
    user,
    password,
    database
  });

  const connect = util.promisify(connection.connect).bind(connection);
  const queryAsync = util.promisify(connection.query).bind(connection);

  try {
    await connect();
    const results = await queryAsync(query);
    connection.end();

    res.json({ result: results });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
