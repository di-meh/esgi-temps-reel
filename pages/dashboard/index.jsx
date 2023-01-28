import {useState} from "react";
import {authOptions} from "../api/auth/[...nextauth]";
import {unstable_getServerSession} from "next-auth";
import {signIn} from "next-auth/react";

export default function Dashboard({sessionProps}) {
    const [isAvailable, setIsAvailable] = useState(false)

    const updateAvailability = async (value) => {
        await fetch("/api/users/" + sessionProps.user.id, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                isAvailable: value,
            })
        });
    }

    return (
        <>
            {sessionProps && <>
                <p>Signed in as {sessionProps.user.email}</p>
                <p>Is available: {isAvailable ? "Yes" : "No"}</p>

                <form onSubmit={(event) => {
                    event.preventDefault();
                    updateAvailability(isAvailable);
                }
                } className="flex flex-col gap-3 items-start">
                    <label htmlFor="available">Are you available ?</label>
                    <input id="available" className="form-checkbox h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" type="checkbox" checked={isAvailable} onChange={() => setIsAvailable(!isAvailable)} />
                    <button type="submit" className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Save</button>
                </form>

            </>}
            {!sessionProps && <>
                <p>Not signed in</p>
                <button onClick={() => signIn()}>Sign in</button>
            </>
            }
        </>
    )
}

export async function getServerSideProps(context) {
    return {
        props: {
            sessionProps: await unstable_getServerSession(
                context.req,
                context.res,
                authOptions
            ),
        },
    }
}
