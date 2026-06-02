export async function onRequest(context) {
  const { env, request } = context;
  
  // 从环境变量读取重定向地址，如果没有则使用默认值
  const targetUrl = env.REDIRECT_TARGET_URL || "https://www.cloudflare.com";
  
  return Response.redirect(targetUrl, 302);
}
