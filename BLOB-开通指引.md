# ⚠️ 部署阻塞：账号 Blob 工作区未开通（需手动处理一次）

## 问题现象

本地联调时，登录 API 返回：

```json
{"code":500,"message":"PagesBlob: credential exchange failed (code=-1): Your account does not have a workspace. Please upgrade your EdgeOne Makers to use Blob."}
```

- 首页静态资源正常（HTTP 200）
- 健康检查 API 正常（`{"code":200,"data":{"status":"ok",...}}`）
- **凡是用到 Blob 的接口（登录/CRUD/AI）全部 500**

## 根因

这是**账号级配置问题，不是代码问题**。你的 EdgeOne 账号（UIN 100033044779）已登录、项目已创建绑定（`student-admin-fullstack` / `makers-nybaeylcyetv`），但账号下**没有分配 Makers 工作空间/Blob 存储资源**。腾讯云官方社区有完全相同报错案例，确认是账号底层存储资源未初始化。

## 解决办法（需要你本人操作，涉及账号实名/套餐）

按顺序尝试：

1. **开通 Makers 服务**：登录 `https://console.cloud.tencent.com/edgeone/makers`，确认是否点过"开通 Makers 服务"（仅登录 EdgeOne 不算，Makers 需单独一键开通）。
2. **初始化 Blob 存储**：控制台进入 "存储 > Blob" 页面，查找"创建存储空间"或"初始化"按钮，手动触发资源分配。
3. **确认站点选择**：若之前登录选过 Global，统一切回 China：`edgeone login --site china`，然后 `edgeone whoami` 复核。
4. **确认实名认证**：账号未完成实名会被静默拦截。
5. **提工单**（以上都不行）：向腾讯云提交工单，附 UIN `100033044779`、项目名 `student-admin-fullstack`、完整报错，说明"Makers 工作空间初始化失败 / 无 Blob workspace"，请后台核查分配。
6. **套餐**：免费版支持 Blob（1GB 额度），但若控制台提示需升级，按官方页面 `https://pages.edgeone.ai/zh/resources/billing-live` 选择专业版。

## 开通后如何继续

Blob 开通后，无需改任何代码，直接：

```bash
cd E:/deyu-management/student-management-system/edgeone-fullstack
export PAGES_SOURCE=skills
edgeone makers deploy -n student-admin-fullstack --json
```

然后按 `DEPLOY-README.md` 的验证清单测试（登录 admin/123456 → 新增学生 → 换无痕窗口验证共享持久化）。

## 代码侧已完成（不受此阻塞影响）

- 56 个文件全部语法检查通过，import 路径无缺失
- 53 个 API 端点全部实现（认证/学生/教师/班级/课程/成绩/公告/消息/文件/大屏/AI 六项/系统/监控）
- 种子数据 20 表、三角色 RBAC、JWT、bcrypt、两步文件直传、AI Gateway + 真实数据兜底
- 前端已切换为真实 API（无 mock），dist 已同步
