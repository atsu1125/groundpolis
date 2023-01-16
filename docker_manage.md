# Dockerで開発する方法

## インストール

このガイドはMisskeyをDocker環境を使用して開発する方法を案内します。

もしDocker環境を使用せずに開発したい場合は別ガイドを参照してください。

## システム準備

* dockerとdocker-composeをインストールしてください。
  * [Docker](https://docs.docker.com/engine/install/)
  * [Docker-compose](https://docs.docker.com/compose/install/)

* このリポジトリをクローンしてください。
  * `git clone https://github.com/atsu1125/groundpolis.git`
  * `cd groundpolis`

## 基本的な設定

```bash
cp .config/dockerdefault.yml .config/default.yml
```

たぶん変更しなくても動きますが、もし特定の環境設定を行いたい場合には変更してください。

データベースをdocker外ものを使う場合には環境変数として`DB_HOST`,`DB_NAME`,`DB_NAME`を付与してください。

## コンテナのビルド

```bash
./dockerbuild.sh
```

これはMisskeyの開発に必要な環境をビルドします。Misskeyをビルドしません。一度だけ必要です。

## Misskeyのビルド

```bash
./dockermanage.sh pnpm install
./dockermanage.sh pnpm build
```

Misskey本体をビルドします。変更を加えるたびに必要です。

## データベースのマイグレーション

```bash
./dockermanage.sh pnpm run migrate
```

データベースのマイグレーションをします。マイグレーションファイルを追加した場合に必要です。

## Misskeyの起動

```bash
docker-compose -f docker-compose-split.yml up
```

Misskeyとその依存関係のRedisとPostgreSQLを起動します。
