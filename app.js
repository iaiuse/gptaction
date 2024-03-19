const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

app.use(cors({
  origin: "*", // 在生产环境中，您应该限制具体的来源，而不是使用 "*"
  methods: '*',
  allowedHeaders: '*',
  credentials: true,
}));

// 示例路由
app.get('/hello', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

// 提供 openapi.json 文件
app.get('/openapi.json', (req, res) => {
    const filePath = path.join(__dirname, 'openapi.json');
    res.sendFile(filePath);
});

// 假设的数据库查询处理
app.post('/api/query', async (req, res) => {
    try {
        // 模拟数据库查询
        const { query } = req.body; // 这里假设您的请求体中包含查询语句

        // 实际的数据库查询逻辑应该在这里实现
        // const result = await db.query(query);

        // 发送假设的响应
        res.json({ result: "这里是查询结果" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// 启动服务
const port = process.env.PORT || 3000; // Vercel 会自动为您的应用分配一个 PORT 环境变量
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
