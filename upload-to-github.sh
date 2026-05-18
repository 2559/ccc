#!/bin/bash

# GitHub 上传到远程仓库

echo "================================"
echo "SMT订单跟踪小程序 - GitHub上传脚本"
echo "================================"
echo ""

# 提示用户输入
echo "请在 GitHub 上创建仓库后，完成以下步骤："
echo ""
echo "1. 访问 https://github.com/new 创建新仓库"
echo "2. 仓库名称填写：smt-order-tracker"
echo "3. 选择 Private（私有）或 Public（公开）"
echo "4. 不要勾选 'Initialize this repository with a README'"
echo "5. 点击 'Create repository'"
echo ""
echo "创建完成后，复制仓库的 HTTPS 地址（类似：https://github.com/你的用户名/smt-order-tracker.git）"
echo ""

echo "请输入你的 GitHub 用户名："
read -r GITHUB_USER

echo "请粘贴仓库地址（直接回车使用默认格式）："
read -r REPO_URL

if [ -z "$REPO_URL" ]; then
    REPO_URL="https://github.com/$GITHUB_USER/smt-order-tracker.git"
fi

echo ""
echo "正在添加远程仓库..."
git remote add origin "$REPO_URL"

echo ""
echo "正在推送代码到 GitHub..."
git push -u origin master

echo ""
echo "================================"
echo "上传完成！"
echo "================================"
echo ""
echo "如果提示需要认证，请使用以下方法之一："
echo ""
echo "方法1：使用 Personal Access Token"
echo "1. 访问 https://github.com/settings/tokens"
echo "2. 点击 'Generate new token'"
echo "3. 勾选 'repo' 权限"
echo "4. 复制生成的 token"
echo "5. 使用命令："
echo "   git remote set-url origin https://你的TOKEN@github.com/$GITHUB_USER/smt-order-tracker.git"
echo "   git push -u origin master"
echo ""
echo "方法2：使用 GitHub CLI"
echo "   gh repo create smt-order-tracker --public --push"
echo ""
echo "上传成功后，可以通过以下命令克隆到本地："
echo "   git clone https://github.com/$GITHUB_USER/smt-order-tracker.git"
