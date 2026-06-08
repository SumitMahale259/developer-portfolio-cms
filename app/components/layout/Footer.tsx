export default function Footer() {
    return(
        <footer className="border-t py-6">
            <p className="text-center text-sm">
                © {new Date().getFullYear()} Sumit.
                All rights reserved.
            </p>
        </footer>
    )
}