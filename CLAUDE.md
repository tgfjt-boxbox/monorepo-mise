# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 必須コマンド

```bash
mise trust && mise i   # 新しいworktreeや初回クローン時に必ず実行
pnpm install          # 依存関係のインストール
```

## プロジェクト構造

これは pnpm ワークスペースを使用した monorepo プロジェクトです：

- **ルート**: 共通のツールと環境変数を管理
- **apps/web**: Webアプリケーション (PORT=3000)
- **apps/api**: APIサーバー (PORT=4000)
- **packages/**: 共有パッケージ用ディレクトリ

## 技術的詳細

### 環境変数の管理

1. **階層構造**
   - ルートの `.mise.toml`: 全体共通の環境変数
   - ルートの `.env.shared`: gitignoreされた共有環境変数
   - 各アプリの `.mise.toml`: アプリ固有の環境変数
   - 各アプリの `.env`: アプリ固有の秘密情報

2. **git worktree での共有**
   - `.env.shared` は **gitignoreされている** - 秘密情報も安全に管理可能
   - git worktree使用時も親リポジトリの`.env.shared`を参照するため環境変数が共有される

3. **動作確認**
   - 環境変数の動作確認は `./test.sh` で行う
   - 各アプリケーションで `mise exec -- env` を実行して個別確認も可能

## 開発フロー

```bash
# 全アプリを並列実行
pnpm dev

# 個別実行
cd apps/web && pnpm dev
cd apps/api && pnpm dev
```