import {randText} from "@ngneat/falso";

export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
export default async function NotificationSSEHandler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'text/event-stream;charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache, no-transform');
    res.setHeader('X-Accel-Buffering', 'no');

    for (let i = 0; i < 50; i++) {
        res.write(`data: {"message": "${randText()}", "id": ${i}}\n\n`);
        await sleep(2000);
    }
    res.end('done\n');

}