# mise による環境変数共有のサンプル

このリポジトリは mise を使っています。
特に git worktree を使う際にも、.env ファイルを gitignore していても環境変数をさっと共有できるのが便利です。

## mise とは

mise（ミーズ）は開発環境のセットアップツールです。フランス語の「mise-en-place（料理の下準備）」が名前の由来です。

主な機能：
- 開発ツール（Node.js、Python等）のバージョン管理
- 環境変数の管理
- タスクランナー機能

## 初回セットアップ（mise 自体のインストール）

### 1. mise のインストール

```bash
# macOS (Homebrew)
brew install mise

# または curl を使う場合
curl https://mise.run | sh

# Ubuntu/Debian
apt install mise

# その他のパッケージマネージャも対応
```

### 2. シェルの設定（mise activate）

**mise activate とは**: 現在のシェルセッションで mise を有効化するコマンドです。

お使いのシェルの設定ファイルに以下を追加します：

#### Bash の場合
```bash
echo 'eval "$(mise activate bash)"' >> ~/.bashrc
source ~/.bashrc  # 設定を反映
```

#### Zsh の場合（macOS のデフォルト）
```bash
echo 'eval "$(mise activate zsh)"' >> ~/.zshrc
source ~/.zshrc  # 設定を反映
```

#### Fish の場合
```fish
echo 'mise activate fish | source' >> ~/.config/fish/config.fish
source ~/.config/fish/config.fish  # 設定を反映
```

> **📝 メモ**: Homebrew でインストールした場合、mise はすでに PATH に含まれています

### 3. インストールの確認

```bash
mise doctor  # または mise dr
```

## このリポジトリでの使い方

### 1. mise trust - 設定ファイルを信頼する

**mise trust とは**: `.mise.toml` を信頼して、環境変数やタスクを実行できるようにするコマンドです。セキュリティのため、新しい設定ファイルは明示的に信頼する必要があります。

```bash
mise trust
```

これにより：
- `.mise.toml` に定義された環境変数が読み込まれます
- プロジェクト固有の設定が適用されます

### 2. mise install - ツールをインストール

**mise install とは**: `.mise.toml` に記載されたツールやランタイムをインストールするコマンドです。

```bash
mise i  # または mise install
```

このコマンドで以下がインストールされます：
- Node.js 22.14.0
- pnpm 10.4.1

また、`.env.shared` から環境変数も自動的に読み込まれます。

## コマンドまとめ

| コマンド | 説明 | いつ使う |
|---------|------|---------|
| `mise activate` | シェルで mise を有効化 | mise を初めてインストールした時（1回だけ） |
| `mise trust` | 設定ファイルを信頼 | 新しいプロジェクトをクローンした時 |
| `mise install` | ツールをインストール | `mise trust` の後、開発を始める前 |

## 使い方

### 環境変数の確認

環境変数が正しく読み込まれているか、個別の設定が反映されているかを確認：

```bash
./test.sh
```

以下のような出力が表示されます：
```
NODE_ENV              = 
HOGE = foo
FUGA = bar
```

`test.sh` は環境変数が読み取れていること、個別の設定も反映されていることを見やすくするためのスクリプトです。

## 仕組み

- `.mise.toml` - ツールのバージョンと環境設定を定義
  - Node.js 22.14.0
  - pnpm 10.4.1
  - `.env.shared` から環境変数を読み込み

- `.env.shared` - Git で管理される共有環境変数
  - このファイルは意図的に gitignore されていません
  - git worktree 間で環境変数を共有できます

## git worktree での利用

新しい worktree を作成しても、`.env.shared` ファイルが自動的に利用可能になるため、環境変数の手動コピーが不要です。

```bash
git worktree add ../feature-branch
cd ../feature-branch
mise trust
mise i
./test.sh  # 環境変数が利用可能！
```