export default {
  async fetch(request, env) {
    const targetUrl = env.REDIRECT_TARGET_URL || "https://www.cloudflare.com";
    return Response.redirect(targetUrl, 302);
  }
};
