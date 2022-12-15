import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Rooms.module.css'
import {io} from "socket.io-client";
import {useEffect, useState} from "react";
import { getRooms } from '../api/rooms';
let socket;
export default function Rooms({rooms}) {


  return (
    <div className={styles.container}>
      <h1 className={styles.test} >Rooms</h1>
        <div className={styles.roomsCard}>
            {rooms.map(room => (
                <div className={styles.roomsItem} key={room.id}>
                    <p>{room.name}</p>
                    <button>Join</button>
                </div>
            ))}
            
        </div>
    </div>
  )
}


export async function getServerSideProps(context) {
    const rooms = await getRooms().then(res => JSON.parse(res));

    console.log(rooms);
    return {
        props: {
            rooms
        }
    }
}