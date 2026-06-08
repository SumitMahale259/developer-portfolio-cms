import Link from "next/link";
// import Button from "../ui/Button";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
    return(
        <header className="border-b">
            <nav className="flex h-16 items-center justify-between">
                <Link href="/">
                    <span className="font-bold">Sumit.dev</span>
                </Link>
                <div className="flex gap-6 items-center">
                    <Link href="/">Home</Link>
                    <Link href="/projects">Projects</Link>
                    <Link href="/blogs">Blog</Link>
                    <Link href="/about">About</Link>
                    <Link href="/contact">Contact</Link>
                    <ThemeToggle/>
                    {/* <Link href="/contact"><Button>Hire Me</Button></Link> */}
                </div>
            </nav>
        </header>
    )
}