import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {io} from "socket.io-client";
import {useEffect, useState} from "react";

let socket;
export default function Login() {
  return (
    <div className={styles.container}>
      <h1>Login</h1>
    </div>
  )
}
