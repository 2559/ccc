# GitHub 上传指南

## 方法一：在 Termux 中一键上传

### 第一步：下载项目到手机
在 Termux 中执行：

```bash
# 进入手机存储
cd /storage/emulated/0/1

# 下载项目（你需要先上传到某个地方，或者使用方法二）
```

### 第二步：安装必要的工具
```bash
pkg update && pkg upgrade
pkg install git openssh
```

### 第三步：配置 Git
```bash
git config --global user.name "你的GitHub用户名"
git config --global user.email "你的GitHub邮箱"
```

### 第四步：克隆项目（如果你已经上传到 GitHub）
```bash
git clone https://github.com/你的用户名/smt-order-tracker.git
cd smt-order-tracker
```

---

## 方法二：完整的上传流程

### 步骤 1：创建 GitHub 仓库

1. 打开浏览器访问 https://github.com
2. 登录你的 GitHub 账号
3. 点击右上角的 "+" 号，选择 "New repository"
4. 填写仓库信息：
   - Repository name: `smt-order-tracker`
   - Description: `SMT订单跟踪微信小程序`
   - 选择 Public 或 Private
   - **不要勾选** "Initialize this repository with a README"
5. 点击 "Create repository"
6. 复制仓库地址（类似：`https://github.com/你的用户名/smt-order-tracker.git`）

### 步骤 2：在 Termux 中设置

```bash
# 进入项目目录
cd /storage/emulated/0/1/smt-order-tracker

# 初始化 Git（如果还没有）
git init

# 添加所有文件
git add .

# 提交
git commit -m "SMT订单跟踪小程序初始版本"

# 添加远程仓库（把下面的 URL 换成你的）
git remote add origin https://github.com/你的用户名/smt-order-tracker.git

# 推送到 GitHub
git push -u origin master
```

### 步骤 3：输入认证信息

推送时可能需要认证，使用以下方法：

**方法 A：使用 Personal Access Token（推荐）**

1. 访问 https://github.com/settings/tokens
2. 点击 "Generate new token"
3. 设置 token 名称，过期时间
4. 勾选 "repo" 权限
5. 点击 "Generate token"
6. 复制生成的 token

然后修改 remote：
```bash
git remote set-url origin https://你的TOKEN@github.com/你的用户名/smt-order-tracker.git
git push -u origin master
```

**方法 B：使用 GitHub CLI**

```bash
# 安装 GitHub CLI
pkg install gh

# 登录
gh auth login

# 创建仓库
gh repo create smt-order-tracker --public --push
```

---

## 克隆项目到其他设备

上传成功后，在任何设备上都可以克隆：

```bash
git clone https://github.com/你的用户名/smt-order-tracker.git
```

在微信开发者工具中导入项目即可使用。

---

## 常见问题

### Q: 推送时被拒绝？
A: 确保仓库已创建，且使用了正确的认证方式。

### Q: 如何更新代码？
A:
```bash
git add .
git commit -m "更新说明"
git push
```

### Q: 如何在手机上继续开发？
A:
```bash
# 在微信开发者工具中修改代码后
git add .
git commit -m "修改说明"
git push
```
