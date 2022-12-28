import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Rooms.module.css'
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { getUsers } from '../api/users';
import { useSession, signIn, signOut } from "next-auth/react"
let socket;


export default function User({ users }) {
    const { data: session } = useSession();
    if (users.length === 0) {
        return (
            <div>
                <h1>Users</h1>
                <p>Il n'y a pas d'utilisateurs disponibles</p>
            </div>
        )
    } else {

        return (
            <div>
                {!session && <>
                    <p>Not signed in</p>
                    <button onClick={() => signIn()}>Sign in</button>
                </>}


                {session && <>
                    <div className='flex flex-col'>
                        {users.map((user) => (
                            <div key={user.id}>
                            { user.email === session.user.email ? <div  style={{display: 'none'}}></div> : <div style={{padding: '1em'}}><p>{user.name}</p><a href={'/users/' + user.id}>Chat</a></div> }
                            </div>
                        ))}
                    </div>
                </>}
            </div>

        )
    }

}


export async function getServerSideProps(context) {
    const users = await getUsers().then(res => JSON.parse(res));
    return {
        props: {
            users
        }
    }
}