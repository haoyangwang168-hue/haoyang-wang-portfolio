# 汪昊阳个人主页

一个记录摄影、骑行、健身、做饭和生活探索的中英双语个人主页。

## 技术栈

- React 19
- Vinext / Vite
- TypeScript
- GSAP 风格的滚动与首屏动效

## 本地运行

需要 Node.js `>=22.13.0`。

```bash
pnpm install
pnpm run dev
```

访问 `http://localhost:3000/`。

## 构建与检查

```bash
pnpm run test
```

该命令会完成生产构建，并运行页面渲染和敏感信息模式检查。

## 项目结构

- `app/`：页面、组件与样式
- `public/assets/`：作品图片、视频和字体资源
- `tests/`：构建结果与安全检查
- `.openai/hosting.json`：Sites 托管配置

## 隐私

仓库不包含 `.env` 文件、访问令牌或私钥。公开发布前仍应避免把任何新的密钥直接写入源码。
