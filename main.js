export default {
  async fetch(request, env) {
    try {
      // 从环境变量读取重定向地址
      // 请在 Cloudflare Dashboard -> Workers & Pages -> stun -> Settings -> Variables -> Environment variables 中设置 REDIRECT_TARGET_URL
      const targetUrl = env.REDIRECT_TARGET_URL || "https://www.cloudflare.com";

      // 执行 302 临时重定向
      return Response.redirect(targetUrl, 302);
    } catch (e) {
      // 捕获所有异常，防止 CONNECTION_RESET
      return new Response(`Error: ${e.message}`, { status: 500 });
    }
  },
};
