import {getRoom} from "../../../api/rooms/[id]";
import {useRouter} from "next/router";


export default function UpdateRoom({room}) {
    const router = useRouter();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);
        const updatedRoom = await fetch("/api/rooms/" + room.id, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        // If the room was updated, redirect to the room page
        if (updatedRoom.status === 204) {
            await router.push("/dashboard/rooms/");
        }
    };
    return (
        <>
            <h1 className="text-3xl font-bold">Update Room</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input name="name" type="text" defaultValue={room.name} />
                <label htmlFor="maxUsers">Max number of users</label>
                <input type={"number"} name={"maxUsers"} defaultValue={room.maxUsers} min={2} />
                <button type={"submit"} className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Update</button>
            </form>
        </>
    )
}

export async function getServerSideProps(context) {
    console.log(await getRoom(context.params.id));
    const room = JSON.parse(await getRoom(context.params.id));
    if (!room) {
        return {
            notFound: true,
        }
    }
    return {
        props: {
            room,
        }
    }
}