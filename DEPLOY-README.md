# AI 智慧学生管理系统 · EdgeOne Makers 全栈部署版

> 这是**真正部署到 EdgeOne Makers、公开访问、数据多人共享持久化**的版本。
> 不是单机浏览器版——所有数据存在云端 Blob，任何人通过公开链接访问看到的都是同一份数据。

## 一、架构

```
浏览器（Vue 前端，静态托管）
   │  HTTPS /api/*
   ▼
EdgeOne 云函数（Node.js，40+ 个 API）
   ├─ 认证：bcrypt + JWT + RBAC 三角色
   ├─ 业务：学生/教师/班级/课程/成绩/公告/消息/文件/大屏
   └─ AI：AI Gateway（@makers/deepseek-v4-flash）六大能力
   │
   ▼
Blob 存储（6 域，强一致性，共享持久化）
   edu-auth / edu-academic / edu-content / edu-logs / edu-ai / edu-config
```

## 二、目录

```
edgeone-fullstack/
├── index.html + assets/     # Vue 前端构建产物（真实 API 版，无 mock）
├── edgeone.json             # EdgeOne 配置
├── package.json             # 依赖：@edgeone/pages-blob, bcryptjs, jsonwebtoken
├── .env.example             # AI Gateway 变量声明（部署时 CLI 自动注入）
└── cloud-functions/
    ├── _lib/
    │   ├── store.js         # Blob 数据层：六域 store、分页、自增、唯一键、JWT、响应包装
    │   ├── seed.js          # 20 表种子数据初始化（ensureSeeded）
    │   └── util.js          # 字段兼容、角色权限、MIME 等工具
    └── api/
        ├── auth/            # 登录/注册/me/配置等
        ├── user/            # 学生/教师/公告/日志/大屏
        ├── class/ course/ score/
        ├── message/ file/
        ├── ai/              # 六大 AI 能力（AI Gateway）
        ├── system/          # 重置演示数据
        └── monitor/         # 健康检查
```

## 三、部署

前置：EdgeOne 账号已登录（`edgeone whoami` 返回账号信息）。

```bash
cd E:/deyu-management/student-management-system/edgeone-fullstack
export PAGES_SOURCE=skills

# 部署（首次会创建项目并绑定）
edgeone makers deploy -n student-admin-fullstack --json
```

部署成功后返回完整 URL（含 `?eo_token=...&eo_time=...`）。**必须完整复制**，漏掉参数会 401。

## 四、演示账号

| 账号 | 密码 | 角色 |
|------|------|------|
| admin | 123456 | 超级管理员（全部权限） |
| zhangsan | 123456 | 教师（教学管理） |
| stu_zs | 123456 | 学生（只读） |

首次访问任一接口时自动初始化种子数据（24 学生/10 教师/6 班级/12 课程/72 成绩等），多用户看到同一份。

## 五、环境变量

`.env.example` 已声明 `AI_GATEWAY_API_KEY` / `AI_GATEWAY_BASE_URL`，EdgeOne 部署时 CLI 自动提供（免密钥调用大模型）。若未注入，AI 函数自动用真实数据规则兜底，不会白屏。

可选：`JWT_SECRET`（不设则用默认密钥，生产环境建议设置：`edgeone makers env set JWT_SECRET <随机串>`）。

## 六、验证清单（部署后）

- [ ] 登录 admin/123456 成功，工作台显示真实统计
- [ ] 学生管理新增一条，换浏览器/无痕窗口登录能看到同一条（共享持久化验证）
- [ ] AI 对话/评语/预警返回基于真实成绩的内容
- [ ] 文件上传后能下载
- [ ] 刷新页面数据不丢

## 七、已知的平台约束（不是功能缺失）

1. Blob 无 SQL JOIN/事务：成绩页用"写入时冗余姓名/课程名"避免 JOIN，功能不变；跨表写入无原子事务，极端并发下可能短暂不一致（班级规模无感）。
2. 云函数请求体上限 6MB：文件上传已改为"预签名 URL 直传 Blob"，绕过此限制。
3. 分页是内存切片：数据量到万级后需优化（当前千级无感）。
4. 系统配置非 Nacos 动态刷新：改配置后前端刷新即生效。
