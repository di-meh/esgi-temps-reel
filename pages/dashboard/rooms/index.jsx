import {getRooms} from "../../api/rooms";
import Link from "next/link";
import {useRouter} from "next/router";

export default function Rooms({rooms}) {
    const router = useRouter();

    const deleteRoom = async (id) => {
        const deletedRoom = await fetch("/api/rooms/" + id, {
            method: "DELETE",
        });
        if (deletedRoom.status === 204) {
            await router.reload();
        }
    }

    return (
        <>
            <h1 className="text-3xl font-bold">Rooms</h1>
            <Link href="/dashboard/rooms/create">
                <button className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Create new Room</button>
            </Link>
            <ul>
                {rooms.map(room => (
                    <li key={room.id}>
                        <p>{room.name}</p>
                        <Link href={"/dashboard/rooms/" + room.id + "/update"}>
                            <button className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Update</button>
                        </Link>
                        <button onClick={() => deleteRoom(room.id)} className="inline-flex items-center rounded-md border border-transparent bg-red-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">Delete</button>
                    </li>
                ))}
            </ul>
        </>
    )
}

export async function getServerSideProps() {
    const rooms = JSON.parse(await getRooms());
    return {
        props: {
            rooms: rooms.sort((a, b) => a.id - b.id),
        }
    }
}