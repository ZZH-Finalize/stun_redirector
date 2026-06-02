# Cloudflare Pages 重定向项目

这个项目实现了一个简单的临时重定向功能，当用户访问时，会从 Cloudflare KV 中读取目标地址并进行 302 重定向。

## 项目结构

```
/workspace
├── functions/
│   └── [[path]].js    # 处理所有路径的请求
├── wrangler.toml      # Wrangler 配置文件
└── README.md          # 说明文档
```

## 部署步骤

### 1. 安装 Wrangler CLI

```bash
npm install -g wrangler
```

### 2. 登录 Cloudflare

```bash
wrangler login
```

### 3. 创建 KV Namespace

```bash
wrangler kv:namespace create "REDIRECT_TARGET"
```

执行后会返回类似输出：
```json
{
  "binding": "REDIRECT_TARGET",
  "id": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "preview_id": "yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy"
}
```

### 4. 更新 wrangler.toml

将上一步获得的 `id` 和 `preview_id` 填入 `wrangler.toml` 文件中对应的字段。

### 5. 设置重定向目标地址

在 KV 中设置 key 为 `target_url` 的值：

```bash
wrangler kv:key put --binding=REDIRECT_TARGET "target_url" "https://example.com"
```

或者在 Cloudflare Dashboard 中手动设置：
- 进入 Workers & Pages → 你的项目 → Settings → Functions → KV namespace bindings
- 点击 "Edit binding" 查看 KV namespace ID
- 然后去 KV 管理界面添加 key-value

### 6. 部署到 Cloudflare Pages

```bash
wrangler pages deploy . --project-name=redirect-pages
```

或者使用 GitHub 集成：
1. 将代码推送到 GitHub
2. 在 Cloudflare Dashboard 中连接 GitHub 仓库
3. 配置构建设置（本项目无需构建步骤）

## 使用方法

部署完成后，访问你的 Pages 域名，所有请求都会被 302 重定向到你在 KV 中设置的 URL。

## 自定义

- **修改 KV key**: 编辑 `functions/[[path]].js` 中的 `"target_url"` 
- **修改重定向类型**: 将 `status: 302` 改为 `301` 可实现永久重定向
- **动态路由**: 可以根据请求路径从 KV 读取不同的目标地址

## 注意事项

- 确保 KV namespace 已正确绑定
- 确保 KV 中已设置 `target_url` key
- 首次部署后可能需要几分钟生效
