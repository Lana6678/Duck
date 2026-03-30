# 私人小说档案 iPhone App 开发方案（Expo + EAS）

版本：`v0.1`

日期：`2026-03-30`

## 1. 方案结论

当前项目的移动端 MVP 采用：

- 客户端框架：`Expo + React Native`
- iOS 构建：`EAS Build`
- iOS 提交：`EAS Submit` 或 `App Store Connect`
- 数据策略：`本地优先`
- 第一期平台：`iPhone`

这条路线的目标是：

- 在 `Windows` 环境下完成主要开发工作
- 不自购 `Mac` 也能完成 iOS 包构建
- 尽快产出一个可安装、可测试、可继续迭代的 iPhone MVP

## 2. 为什么选 Expo + EAS

相对 `SwiftUI + Xcode` 原生路线，Expo + EAS 更适合当前阶段：

- 你当前环境是 `Windows`
- 产品仍处于 `MVP` 验证阶段
- 需求以表单、列表、搜索、标签、详情页为主
- 当前最重要的是快速做出可用版本，不是极致原生能力

这条路线的优势：

- 本地开发门槛低
- 可直接复用到 Android
- iOS 构建可放到云端完成
- 社区成熟，适合 CRUD 类产品

需要接受的现实限制：

- 真正的 iOS 原生问题排查不如本地 Mac 方便
- 最终上架仍然需要 Apple Developer 账号
- 某些复杂原生能力接入成本会高于纯原生 Swift

## 3. 无 Mac 的可行方式

本项目采用的“无 Mac”定义是：

- `不自己持有 Mac`
- `主要开发过程不依赖本地 macOS`

可行链路如下：

1. 在 `Windows` 上编写 React Native / Expo 代码
2. 本地使用 `Expo` 进行开发调试
3. 将 iOS 构建交给 `EAS Build`
4. 使用 `TestFlight` 或开发包在 iPhone 真机测试
5. 使用 `EAS Submit` 或 `App Store Connect` 提交审核

边界说明：

- 不是完全脱离 Apple 工具链
- 仍然需要 Apple Developer 账号来完成签名和分发
- 某些证书、Bundle ID、权限配置仍然属于苹果生态要求

## 4. MVP 产品范围

第一阶段只做最小闭环，不做重功能堆叠。

### 4.1 MVP 功能

- 小说条目列表
- 新增小说条目
- 编辑小说条目
- 删除小说条目
- 标签管理
- 标签筛选
- 关键词搜索
- 小说详情页
- 阅读状态管理
- 评分与备注
- 本地数据持久化
- 数据导出备份

### 4.2 暂不做

- 登录系统
- 多设备实时同步
- OCR
- AI 自动打标
- 图谱可视化
- 复杂推荐系统
- 云端账号体系

原因很简单：第一版先验证“是否真的能高频录入和检索小说档案”。

## 5. 信息架构

建议采用底部四导航：

- `书库`
- `搜索`
- `新增`
- `我的`

关键页面如下：

### 5.1 书库页

- 小说列表
- 状态筛选
- 标签筛选入口
- 排序：最近更新 / 最近阅读 / 评分

### 5.2 搜索页

- 关键词搜索
- 标签组合筛选
- 搜索历史
- 热门标签

### 5.3 新增/编辑页

- 标题
- 作者
- 简介
- 阅读状态
- 评分
- 标签选择
- 备注

### 5.4 详情页

- 基础信息
- 标签
- 阅读状态
- 评分
- 长备注
- 更新时间

### 5.5 我的页

- 标签管理
- 数据导出
- 数据导入
- 备份说明
- 版本信息

## 6. 数据模型建议

第一版不要做复杂关系设计，先保证简单稳定。

### 6.1 novels

- `id`
- `title`
- `author`
- `summary`
- `status`
- `rating`
- `note`
- `created_at`
- `updated_at`

### 6.2 tags

- `id`
- `name`
- `category`
- `created_at`

### 6.3 novel_tags

- `id`
- `novel_id`
- `tag_id`

### 6.4 statuses

建议固定枚举：

- `想读`
- `在读`
- `读完`
- `弃读`
- `重温中`

## 7. 技术栈建议

建议采用以下组合：

- 框架：`Expo`
- 语言：`TypeScript`
- 路由：`expo-router`
- 本地数据库：`expo-sqlite`
- 表单：`react-hook-form`
- 校验：`zod`
- 状态管理：`zustand`
- UI 基础：先自建轻量组件，不急着引入重 UI 库

原因：

- `expo-router` 适合 App 页面结构
- `sqlite` 比纯 JSON 更适合搜索、筛选和后续扩展
- `zustand` 足够轻，不会把项目带复杂

## 8. 开发阶段拆分

### 阶段 1：项目初始化

目标：把项目脚手架和基础运行链路搭起来。

交付：

- 创建 Expo 项目
- 配置 TypeScript
- 配置 `expo-router`
- 建立基础目录结构
- 跑通本地开发环境
- 跑通 EAS 配置

### 阶段 2：数据层落地

目标：先把数据存取做稳。

交付：

- 初始化 SQLite
- 建表脚本
- 基础 CRUD
- 标签关联逻辑
- 导出 JSON 备份

### 阶段 3：核心页面

目标：做出最小可用产品。

交付：

- 书库列表页
- 新增/编辑页
- 详情页
- 搜索页
- 我的页

### 阶段 4：体验打磨

目标：提升录入和检索效率。

交付：

- 搜索优化
- 标签筛选优化
- 表单交互优化
- 空状态 / 错误状态
- iPhone 小屏适配

### 阶段 5：真机测试与分发

目标：让 iPhone 用户可安装使用。

交付：

- EAS iOS 构建
- 开发包安装
- TestFlight 内测
- 首版提审准备

## 9. 推荐目录结构

```text
app/
  (tabs)/
    library.tsx
    search.tsx
    create.tsx
    profile.tsx
  novel/
    [id].tsx
  novel-edit/
    [id].tsx
  _layout.tsx

src/
  components/
  features/
    novels/
    tags/
    search/
  db/
    client.ts
    schema.ts
    migrations.ts
  store/
  utils/
  constants/
  types/
```

## 10. 里程碑建议

### Milestone 1

7 天内完成：

- 项目初始化
- 底部导航
- SQLite 建表
- 小说列表页
- 新增小说页

### Milestone 2

再用 5 到 7 天完成：

- 编辑页
- 详情页
- 标签管理
- 搜索页
- 本地备份导出

### Milestone 3

再用 3 到 5 天完成：

- 真机测试
- Bug 修复
- EAS iOS 构建
- TestFlight 内测

## 11. 开发环境准备

你现在用 Windows，可以先准备：

- `Node.js LTS`
- `npm` 或 `pnpm`
- `Git`
- `VS Code`
- `Expo CLI`
- `EAS CLI`

建议命令：

```bash
npm install -g eas-cli
npx create-expo-app@latest
```

## 12. iOS 发布前置条件

虽然你不需要本地 Mac，但以下条件仍然需要：

- `Apple ID`
- `Apple Developer Program`
- `App Store Connect` 权限
- 可用的 `Bundle Identifier`

如果只是本地自己开发，不一定立刻需要完整上架流程；但只要进入 iPhone 真机分发，就基本离不开开发者账号。

## 13. 风险与规避

### 风险 1：一开始做太多功能

规避：

- 第一版只做档案录入、标签、搜索、详情

### 风险 2：先做 AI / OCR 导致项目失控

规避：

- 第一版先人工录入，后续再补自动化

### 风险 3：本地存储方案选得太弱

规避：

- 不建议第一版用纯文本文件直存
- 直接用 `SQLite`

### 风险 4：没有真机测试

规避：

- 尽早准备一台 iPhone 做安装测试

## 14. 下一步执行建议

下一步按这个顺序推进：

1. 在仓库中新增移动端目录，例如 `mobile/`
2. 初始化 `Expo` 项目
3. 建立页面路由骨架
4. 设计 SQLite 表结构
5. 先完成“新增小说 + 列表展示”闭环
6. 再做标签和搜索
7. 最后接入 EAS iOS 构建

## 15. 当前决策

当前确认的方案是：

- 先做 `iPhone MVP`
- 技术路线采用 `Expo + EAS`
- 主要开发环境为 `Windows`
- 第一版以 `本地优先` 为主
- 不在第一阶段引入复杂 AI、OCR 和云同步

这意味着后续技术文档、任务拆分和代码目录，都应围绕这个方案展开。
