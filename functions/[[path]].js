export async function onRequest({ env, request }) {
  // --- 调试模式：硬编码地址，跳过 KV (用于排查问题) ---
  const targetUrl = "https://www.cloudflare.com"; 
  
  /* 
  // --- 正式模式：从 KV 读取 ---
  const targetUrl = await env.REDIRECT_TARGET.get("target_url");
  
  if (!targetUrl) {
    return new Response("Redirect target not configured", {
      status: 503,
      headers: { "Content-Type": "text/plain" },
    });
  }
  */

  // 返回 302 临时重定向
  return new Response(null, {
    status: 302,
    headers: {
      "Location": targetUrl,
    },
  });
}
