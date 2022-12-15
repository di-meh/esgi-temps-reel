export default function NotificationSSEHandler(req, res) {
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')

    // Envoyer des événements en temps réel au client
    setInterval(() => {
        res.write(`data: ${new Date()}\n\n`)
    }, 5000);

}