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


// 添加的 /api/random 路由
app.get('/api/random', (req, res) => {
  const randomNumber = getRandomNumber();
  res.json({ randomNumber });
});

app.post('/api/adventure', (req, res) => {
    const { action, level } = req.body;

    // 确保收到的参数有效
    if (typeof action !== 'string' || typeof level !== 'number') {
        return res.status(400).send('Invalid input');
    }

    // 根据接收的参数生成故事的下一部分
    const story = generateStoryPart(action, level);

    // 发送生成的故事段落作为响应
    res.json({ story });
});

function generateStoryPart(action, level) {
    // 根据动作指令和角色等级来生成故事
    const outcomes = {
        "探索洞穴": [
            "你在洞穴中发现了一个闪闪发光的宝箱。",
            "一只洞穴巨蛛突然出现，阻挡了你的去路。"
        ],
        "与巨龙对话": [
            "巨龙对你的勇气表示赞赏，并赠予你一块龙鳞。",
            "巨龙不耐烦地摆动尾巴，你感觉这次谈话可能不会有好结果。"
        ]
    };

    const levels = [
        "这件事对你来说简直易如反掌。",
        "这是一次考验，但你觉得自己准备得很充分。",
        "这可能超出了你的能力范围，要小心行事。"
    ];

    const actionOutcome = outcomes[action] || ["你的行动没有产生任何结果。"];
    const levelComment = levels[Math.min(level, levels.length - 1)];

    // 随机选择一个动作结果
    const randomOutcome = actionOutcome[Math.floor(Math.random() * actionOutcome.length)];

    // 组合故事的各个部分
    return `${randomOutcome} ${levelComment}`;
}

// 添加的 /api/random 路由
app.get('/api/random', (req, res) => {
  const randomNumber = getRandomNumber();
  res.json({ randomNumber });
});

function getRandomNumber() {
  return Math.floor(Math.random() * 6) + 1;
}

// 启动服务
const port = process.env.PORT || 3000; // Vercel 会自动为您的应用分配一个 PORT 环境变量
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
