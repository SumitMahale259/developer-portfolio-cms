import Sidebar from "../components/admin/layout/Sidebar";

export default function AdminLayout({children}: {children: React.ReactNode}) {
    return (
        <div className="flex">
            <aside className="w-64 border-r min-h-screen p-4">
                <Sidebar/>
            </aside>
            <main className="flex-1 p-6">
                {children}
            </main>
        </div>
    )
}