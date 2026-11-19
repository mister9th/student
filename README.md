# AI 智慧学生管理系统 · EdgeOne Makers 全栈版

Vue 3 前端 + Node.js 云函数 + Blob 存储 + AI Gateway，部署到 EdgeOne Makers，公开访问、数据多用户共享持久化。

## 仓库结构

```
./
├── index.html + assets/      前端构建产物（已是成品，无需再构建）
├── cloud-functions/          Node.js 云函数（53 API 端点）
├── edgeone.json              EdgeOne 配置
├── package.json              云函数依赖（@edgeone/pages-blob / bcryptjs / jsonwebtoken）
└── .env.example              AI Gateway 变量声明
```

## EdgeOne 部署配置（导入此仓库时）

| 项 | 值 |
|---|---|
| Framework Preset | 无 / Static |
| Root Directory | `./`（仓库根目录） |
| Build Command | **留空**（仓库内 index.html + assets 已是构建好的成品） |
| Output Directory | `./`（根目录即产物） |
| Node Version | 22.x |
| 部署分支 | `main` |

> 重要：不要设置 build 命令。本仓库已是最终产物，EdgeOne 直接部署即可。
> 云函数依赖由 EdgeOne 在部署时依据 package.json 自动安装。

## 自动部署

EdgeOne 项目连接本仓库的 `main` 分支并开启 Auto Deploy 后：
- 向 `main` push 代码 → EdgeOne 自动重新部署；
- 无需手动上传 zip，也无需在控制台点重新部署。

## 环境变量

EdgeOne 会自动注入 `AI_GATEWAY_API_KEY` / `AI_GATEWAY_BASE_URL`（`.env.example` 已声明）。若需自定义 JWT 密钥，在项目环境变量中加 `JWT_SECRET`。

## 演示账号

| 账号 | 密码 | 角色 |
|------|------|------|
| admin | 123456 | 超级管理员 |
| zhangsan | 123456 | 教师 |
| stu_zs | 123456 | 学生 |

## 前端源码

前端 Vue 源码在另一个仓库/目录 `student-admin-web`（本仓库只放构建产物）。
修改源码后需先 `npm run build`，再把 dist 内容同步到本仓库根目录后提交。
