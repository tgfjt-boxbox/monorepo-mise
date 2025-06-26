# pnpm Monorepo with mise

**mise と pnpm を使った Monorepo 開発環境のサンプル**

---

## 🚀 クイックスタート

このプロジェクトをすぐに使い始めるための手順：

```bash
# 1. リポジトリをクローン
git clone <repository-url>
cd monorepo-mise

# 2. 設定を信頼して環境をセットアップ
mise trust && mise i

# 3. 依存関係をインストール
pnpm install

# 4. 環境変数の確認
./test.sh

# 5. 各アプリケーションの起動
pnpm dev  # すべてのアプリを並列実行
```

これだけで開発環境の準備は完了です！

---

## mise とは

mise（ミーズ）は開発環境のセットアップツールです。フランス語の「mise-en-place（料理の下準備）」が名前の由来です。

**主な特徴**
- 開発ツール（Node.js、Python等）のバージョン管理
- 環境変数の管理
- タスクランナー機能
- git worktree での環境共有に対応

---

## セットアップフロー

### Step 1: mise 本体のインストール（初回のみ）

#### macOS
```bash
brew install mise
```

#### Linux
```bash
# Ubuntu/Debian
apt install mise

# その他のインストール方法
curl https://mise.run | sh
```

### Step 2: シェルの設定（初回のみ）

お使いのシェルに合わせて設定を追加：

<details>
<summary><strong>Bash の場合</strong></summary>

```bash
echo 'eval "$(mise activate bash)"' >> ~/.bashrc
source ~/.bashrc
```
</details>

<details>
<summary><strong>Zsh の場合（macOS デフォルト）</strong></summary>

```bash
echo 'eval "$(mise activate zsh)"' >> ~/.zshrc
source ~/.zshrc
```
</details>

<details>
<summary><strong>Fish の場合</strong></summary>

```fish
echo 'mise activate fish | source' >> ~/.config/fish/config.fish
source ~/.config/fish/config.fish
```
</details>

### Step 3: インストールの確認

```bash
mise doctor
```

---

## プロジェクトでの使い方

### 基本コマンド

| コマンド | 説明 | 使用タイミング |
|---------|------|--------------|
| `mise trust` | 設定ファイルを信頼 | 新規クローン時 |
| `mise i` | ツールをインストール | trust の後 |
| `./test.sh` | 環境変数を確認 | セットアップ後 |

### コマンドの詳細

#### `mise trust`
`.mise.toml` を信頼して、環境変数やタスクを実行可能にします。セキュリティのため、新しい設定ファイルは明示的に信頼する必要があります。

#### `mise install` (省略形: `mise i`)
`.mise.toml` に記載されたツールをインストールします：
- Node.js 22.14.0
- pnpm 10.4.1
- `.env.shared` から環境変数を自動読み込み

---

## プロジェクト構成

### ディレクトリ構造

```
repo/                         # Git ルート
├── .env.shared              # 全体共通の環境変数（gitignore）
├── .mise.toml               # 共通ツール & 共通ENV
├── .gitignore               # .env.shared と .worktrees を除外
├── pnpm-workspace.yaml      # pnpm ワークスペース設定
├── package.json             # ルートパッケージ
├── apps/                    # monorepo の各アプリ
│   ├── web/
│   │   ├── .env            # web 専用 dotenv
│   │   ├── .mise.toml      # web 専用設定（共通を上書き・追加）
│   │   ├── package.json
│   │   └── index.js        # サンプル Web アプリ（PORT=3000）
│   └── api/
│       ├── .env            # api 専用 dotenv
│       ├── .mise.toml      # api 専用設定
│       ├── package.json
│       └── index.js        # サンプル API（PORT=4000）
├── packages/                # 共有パッケージ用ディレクトリ
└── .worktrees/              # 任意：作業ツリー置き場（Git 管理外）

### 環境変数の階層構造

1. **ルートレベル（全体共通）**
   - `.mise.toml`: `BASE_URL`, `NODE_ENV` など
   - `.env.shared`: `SHARED_SECRET`, `DATABASE_URL` など

2. **アプリケーションレベル**
   - `apps/web/.mise.toml`: `PORT=3000`, `APP_NAME=web`
   - `apps/web/.env`: `WEB_SECRET` など
   - `apps/api/.mise.toml`: `PORT=4000`, `APP_NAME=api`
   - `apps/api/.env`: `API_KEY` など

3. **環境変数の継承**
   - 各アプリケーションはルートの環境変数を継承
   - アプリ固有の設定で上書き・追加が可能

### 重要なポイント

1. **`.env.shared` は gitignore されています**
   - チーム間で共有したい環境変数を安全に管理
   - git worktree でも親リポジトリの `.env.shared` を参照

2. **pnpm ワークスペース**
   - `pnpm-workspace.yaml` で monorepo 構成を定義
   - 各アプリは独立したパッケージとして管理

3. **セキュアな設計**
   - `mise trust` により明示的な許可が必要
   - 環境変数の意図しない読み込みを防止

---

## 開発フロー

### アプリケーションの実行

```bash
# すべてのアプリを並列実行
pnpm dev

# 個別に実行
cd apps/web && pnpm dev  # Web アプリのみ
cd apps/api && pnpm dev  # API のみ
```

### 環境変数の確認

```bash
# スクリプトで一括確認
./test.sh

# 個別のアプリで確認
cd apps/web && mise exec -- env | grep -E "NODE_ENV|PORT|APP_NAME"
```

## git worktree での活用

新しい worktree でも環境変数の手動コピーは不要：

```bash
# 新しい worktree を作成
git worktree add .worktrees/feature-branch

# worktree に移動してセットアップ
cd .worktrees/feature-branch
mise trust && mise i
pnpm install

# 環境変数が自動的に利用可能！
./test.sh
```

---

## トラブルシューティング

<details>
<summary><strong>mise コマンドが見つからない</strong></summary>

シェルの設定が正しく反映されているか確認：
```bash
# 設定ファイルを再読み込み
source ~/.bashrc  # または ~/.zshrc
```
</details>

<details>
<summary><strong>環境変数が読み込まれない</strong></summary>

`mise trust` を実行したか確認：
```bash
mise trust
mise i
```
</details>

---

## 参考リンク

- [mise 公式ドキュメント](https://mise.jdx.dev/)
- [mise GitHub リポジトリ](https://github.com/jdx/mise)
