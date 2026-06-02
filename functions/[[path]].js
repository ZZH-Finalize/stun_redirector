export async function onRequest({ env, request }) {
  // 从 KV 中读取重定向目标地址
  // 使用固定 key "target_url"，你也可以根据需求修改为动态 key
  const targetUrl = await env.REDIRECT_TARGET.get("target_url");

  if (!targetUrl) {
    // 如果 KV 中没有配置目标地址，返回错误
    return new Response("Redirect target not configured", {
      status: 503,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }

  // 返回 302 临时重定向
  return new Response(null, {
    status: 302,
    headers: {
      "Location": targetUrl,
    },
  });
}
