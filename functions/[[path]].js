export async function onRequest(context) {
  const { env } = context;
  
  // 从 KV 存储中读取重定向目标地址
  const targetUrl = await env.REDIRECT_TARGET.get("target_url");
  
  // 如果 KV 中没有设置，返回错误
  if (!targetUrl) {
    return new Response("Redirect target URL not configured in KV", { status: 500 });
  }
  
  return Response.redirect(targetUrl, 307);
}
