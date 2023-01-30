import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="bg-gray-800 p-6 text-white w-full flex flex-row gap-4">
            <Link href={"/"}>Home</Link>
            <Link href={"/notifications"}>Notifications</Link>
            <Link href={"/profile"}>Profile</Link>
            <Link href={"/dashboard"}>Dashboard</Link>
            <Link href={"/users"}>Users</Link>
            <Link href={"/rooms"}>Rooms</Link>
        </nav>
    );
}