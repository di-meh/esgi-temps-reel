import { useSession, signIn, signOut } from "next-auth/react"
export default function Profile() {
    const { data: session } = useSession()
    return (
        <>
            {!session && <>
                <p>Not signed in as admin</p>
                <button onClick={() => signIn()}>Sign in</button>
            </>}
            {session && <>
                <p>Signed in as {session.user.email}</p>
                <button onClick={()=> signOut()}>Sign out</button>
            </>}
        </>
    )

}