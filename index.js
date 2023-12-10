const server = Bun.serve({
    port: Bun.env.PORT || 3000,
    async fetch(req) {

        const url = new URL(req.url);

        if (url.pathname == "/") {
            return new Response("Hello, Bit.link!")
        }

        const file = Bun.file("./data.json");
        const links = await file.json()

        const data = links.find((data) => data.path == url.pathname)

        if (!data) {
            return new Response("404 Link Not Found")
        }

        return Response.redirect(data.link);
    },
});

console.log(`Listening on http://localhost:${server.port} ...`);