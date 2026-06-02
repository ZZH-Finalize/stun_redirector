export default {
  async fetch(request, env) {
    // 从环境变量读取重定向地址 (优先) 或 KV
    let targetUrl = env.REDIRECT_TARGET_URL;
    
    // 如果没有环境变量，尝试从 KV 读取
    if (!targetUrl && env.REDIRECT_TARGET) {
      targetUrl = await env.REDIRECT_TARGET.get("target_url");
    }

    // 如果都没找到，返回错误
    if (!targetUrl) {
      return new Response("Redirect target not configured. Set REDIRECT_TARGET_URL env var or bind KV.", { 
        status: 500 
      });
    }

    // 执行 302 临时重定向
    return Response.redirect(targetUrl, 302);
  }
};
