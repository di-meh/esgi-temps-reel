import { getRooms } from '../api/rooms';
import Link from "next/link";


export default function Rooms({ rooms }) {
    if (rooms.length === 0) {
        return (
            <div>
                <h1>Rooms</h1>
                <p>Il n'y a pas de rooms disponibles</p>
            </div>
        )
    } else {
        return (

            <div className="p-10">
                <h1 className="text-2xl">Rooms</h1>
                    <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {rooms.map((room) => (
                            <li key={room.id} >
                                <div className="col-span-1 flex shadow-sm rounded-md">
                                    <div className="flex-shrink-0 flex items-center justify-center w-16 bg-pink-600 text-white text-sm font-medium rounded-l-md">
                                        0/{room.maxUsers}
                                    </div>
                                    <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white  truncate">
                                        <div className="flex-1 px-4 py-2 text-sm truncate">
                                            <Link href={'/rooms' + room.slug} className="text-gray-900 font-medium hover:text-gray-600">{room.slug}</Link>
                                            <p className="text-gray-500">{room.description}</p>
                                        </div>
                                        <div className="flex-shrink-0 pr-2">
                                            <button type="button" className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                <Link href={'/rooms/' + room.slug}>Rejoindre</Link>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
            </div>
        )
    }

}


export async function getServerSideProps(context) {
    const rooms = await getRooms().then(res => JSON.parse(res));
    return {
        props: {
            rooms
        }
    }
}