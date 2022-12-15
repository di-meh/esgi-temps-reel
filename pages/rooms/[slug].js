import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import {io} from "socket.io-client";
import {useEffect, useState} from "react";

let socket;
export default function Room() {
  return (
    <div className={styles.container}>
      <h1>Room</h1>
    </div>
  )
}
