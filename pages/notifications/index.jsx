import {useEffect, useState} from "react";

export default function Notifications() {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        let eventSource = new EventSource("/api/notifications/sse");
        eventSource.onmessage = (event) => {
            setNotifications((notifications) => [...notifications, JSON.parse(event.data)]);
        }
        return () => {
            eventSource.close();
        }
    }, []);

    return (
        <>
            <h1 className="text-3xl font-bold">Notifications</h1>
            <ul>
                {notifications.map(notification => (
                    <li key={notification.id}>{notification.message}</li>
                ))}
            </ul>
        </>
    )
}