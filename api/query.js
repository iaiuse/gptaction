// /api/query.js
const { Pool } = require('pg');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { host, user, password, database, query } = req.body;

  // 创建连接池
  const pool = new Pool({
    host,
    user,
    password,
    database,
    port: 5432, // PostgreSQL 默认端口
  });

  try {
    // 使用连接池查询
    const { rows } = await pool.query(query);
    // 不需要显式关闭连接，连接池会管理连接

    res.json({ result: rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
