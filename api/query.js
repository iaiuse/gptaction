const { Pool } = require('pg');

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { host, user, password, database, query } = req.body;

    // 对于每个请求，根据提供的凭证创建一个新的连接池
    const pool = new Pool({
        host,
        user,
        password,
        database,
        port: 5432, // PostgreSQL 默认端口
    });

    try {
        // 使用连接池执行查询
        const queryResult = await pool.query(query);
        pool.end(); // 关闭连接池

        // 规范化并准备结果
        const result = queryResult.rows.map(row => {
            const rowDict = {};
            queryResult.fields.forEach(field => {
                rowDict[field.name] = row[field.name];
            });
            return rowDict;
        });

        res.json({ result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
        pool.end(); // 确保即使在出错时也关闭连接池
    }
};
