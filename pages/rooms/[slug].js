import {io} from "socket.io-client";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {randUuid} from "@ngneat/falso";

let socket;
export default function Room() {
    const [messages, setMessages] = useState([]);
    const router = useRouter();
    const { slug } = router.query;

    useEffect(() => {
        console.log('Joining room', slug);
        const SocketHandler = async () => {
            await fetch('/api/socketio');
            socket = io();
            // Make client join room if not already in room
            socket.emit('join', slug);

            socket.on('connect', () => {
                console.log('connected')
            });

            socket.on('room-message-receive', (message) => {
                setMessages(messages => [...messages, message]);
                console.log('message received', message)
            });

        };
        SocketHandler();

        return () => {
            if (socket) {
                socket.emit('leave', slug);
                socket.disconnect();
            }
        };
    }, [slug]);

    return (
        <div>
            <h1>Room {slug}</h1>
            <form onSubmit={event => {
                event.preventDefault();
                const messageObject = {
                    id: randUuid(),
                    userId: socket.id,
                    message: event.target.message.value
                };
                socket.emit('room-message', slug, messageObject);
                event.target.message.value = '';
                setMessages(messages => [...messages, messageObject]);
            }
            }>
                <label htmlFor="message" className="sr-only">
                    Message
                </label>
                <input
                    type="text"
                    name="message"
                    id="message"
                    min={1}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Entrez votre message"
                />
                <button
                    type="submit"
                    className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >Submit</button>
            </form>
            {messages.length > 0 &&
                <ul>
                    {messages.map((message) => (
                        <li key={message.id}><span className="font-bold">{message.userId}</span> {message.message}</li>
                    ))}
                </ul>
            }


        </div>
    )
}
