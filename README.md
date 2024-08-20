## BCJJ-API

此文件夹为后台接口开发项目，项目使用了 Node.js + Express + MySQL + Sequelize ORM 开发。

## 配置环境变量

将`.env.example`文件拷贝为`.env`文件，并修改配置。

```txt
NODE_ENV=development
PORT=3000
SECRET=你的秘钥
RSA_PRIVATE_KEY=你的私钥
```

其中`NODE_ENV`配置为开发环境，如部署在生产环境可改为 prodection。
`PORT`配置为服务端口，
`JWT_SECRET`配置为秘钥，
`RSA_PRIVATE_KEY`配置为 RSA 私钥。

## 生成秘钥

在命令行中运行

```shell
node
```

进入交互模式后，运行

```js
const crypto = require("crypto");
console.log(crypto.randomBytes(32).toString("hex"));
```

复制得到的秘钥，并填写到`.env`文件中的`JWT_SECRET`配置。

> PS：可以使用 `ctrl + c` 退出交互模式。

## 生成 RSA 密钥队

此操作会生成密钥对（公钥 publicKey 和私钥 privateKey），公钥用于加密，私钥用于解密。
公钥放在前端，私钥放在后端。

在命令行中运行

```shell
node
```

进入交互模式后，运行

```js
const crypto = require("crypto");

const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: 1024,
  publicKeyEncoding: {
    type: "spki",
    format: "pem",
  },
  privateKeyEncoding: {
    type: "pkcs8",
    format: "pem",
  },
});

console.log(publicKey);

console.log(privateKey);
```

复制得到的公钥 publicKey，并填写到前端项目（front-endvue-manage-system `）.env`文件中的`VITE_RSA_PUBLIC_KEY`配置。

复制得到的私钥 privateKey，并填写到`.env`文件中的`RSA_PRIVATE_KEY`配置。

> PS：可以使用 `ctrl + c` 退出交互模式。

## 配置数据库

项目使用自行安装的 MySQL，需要修改`config/config.js`文件中的数据库用户名与密码。

```json
{
  "development": {
    "username": "您的数据库用户名",
    "password": "您的数据库密码"
  }
}
```

## 安装与运行

```shell

# 安装项目依赖包

npm i

# 创建数据库。如创建失败，可以手动建库。

npx sequelize-cli db:create --charset utf8mb4 --collate utf8mb4_general_ci

# 运行迁移，自动建表。

npx sequelize-cli db:migrate

# 运行种子，填充初始数据。

npx sequelize-cli db:seed:all

# 启动服务

npm run dev
```

访问地址：[http://localhost:3000](http://localhost:3000)，详情请看接口文档。

## 初始超级管理员账号

```txt
账号：superadmin
密码：123123
```

## 项目主要结构

```
├── config
    ├── www
├── config
├── middlewares
├── migrations
├── models
├── routes
│   ├── admin
├── seeders
├── utils
├── app.js
├── .env
└── package.json

cofing：配置文件
middlewares：中间件
migrations：数据库迁移文件
routes：路由
seeders：种子文件
utils：工具函数
app.js：入口文件
.env：环境变量
package.json：项目的基本信息，和一些依赖包的情况
```
