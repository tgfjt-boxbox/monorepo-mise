# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 必須コマンド

```bash
mise trust && mise i   # 新しいworktreeや初回クローン時に必ず実行
```

## 技術的詳細

- `.env.shared` は **gitignoreされている** - 秘密情報も安全に管理可能
- git worktree使用時も親リポジトリの`.env.shared`を参照するため環境変数が共有される
- 環境変数の動作確認は `./test.sh` で行う