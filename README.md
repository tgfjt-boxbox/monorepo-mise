# mise による環境変数共有のサンプル

**git worktree でも環境変数を簡単に共有できる開発環境セットアップ**

---

## 🚀 クイックスタート

このプロジェクトをすぐに使い始めるための手順：

```bash
# 1. リポジトリをクローン
git clone <repository-url>
cd monorepo-mise

# 2. 設定を信頼して環境をセットアップ
mise trust && mise i

# 3. 環境変数の確認
./test.sh
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

## 仕組みの解説

### ファイル構成

```
.
├── .mise.toml      # ツールのバージョンと環境設定
├── .env.shared     # 共有環境変数（git管理対象）
└── test.sh         # 環境変数の確認スクリプト
```

### 重要なポイント

1. **`.env.shared` は gitignore されていません**
   - git worktree 間で環境変数を共有可能
   - チーム全体で同じ環境変数を使用

2. **セキュアな設計**
   - `mise trust` により明示的な許可が必要
   - 環境変数の意図しない読み込みを防止

---

## git worktree での活用

新しい worktree でも環境変数の手動コピーは不要：

```bash
# 新しい worktree を作成
git worktree add ../feature-branch

# worktree に移動してセットアップ
cd ../feature-branch
mise trust && mise i

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
