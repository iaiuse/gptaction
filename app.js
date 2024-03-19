const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

// 导入 query 处理函数
const handleQuery = require('./api/query');

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

// 使用 query.js 处理 /api/query 路径
app.post('/api/query', handleQuery);


// 启动服务
const port = process.env.PORT || 3000; // Vercel 会自动为您的应用分配一个 PORT 环境变量
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
