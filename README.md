# deno-kv-manager

Deno KV用の管理画面プロジェクトです  
ローカルで起動して利用できるようになっています

localhost:8080を使用するため、通常のDenoプロジェクトとポートが衝突することはありません

![page-screen-shot](./page-screen-shot.png)

## Installation

### 1. 前提環境の構築
以下のコマンドが使用できるようにしておいてください。
- `deno`

### 2. リポジトリのクローン
以下のコマンドを実行して下さい。
```sh
git clone git@github.com:jigintern/deno-kv-manager.git
cd deno-kv-manager
```

### 3. 起動
```sh
deno run -A --unstable-kv server.ts
```

### Tutorial

1. 画面左下に、Deno KVのURLと、Deno Deployのアクセストークンを入力します

URLは、接続したいデータベースのDatabase IDを次の形に当てはめたものです。

```
https://api.deno.com/v2/databases/<Database ID>/connect
```

Database IDは、Deno Deployコンソールのデータベースページにある、Databases一覧で確認できます。
アクセストークンは、パーソナルアクセストークンと組織のアクセストークンのどちらでも使えます。組織のアクセストークンは、コンソールの組織設定ページで発行します。

> Deno Deployコンソール: https://console.deno.com

かつてのDeploy Classic (dash.deno.com) は2026年7月20日に終了したため、Classic上のデータベースには接続できません。

2. 「最新状態の取得」を押下すると、Deno KVのデータが全取得されます

3. 「指定行の更新」を押下すると、チェックをつけた行の更新リクエストが発行されます

4. 「指定行の削除」を押下すると、チェックをつけた行の削除リクエストが発行されます

5. 「全削除」を押下すると、Deno KV内の全データが削除されます