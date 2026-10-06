export function healthCheck(req, res) {
    res.json({
        status: "OK",
        message: "HelpDesk API está funcionando!"
    });
}