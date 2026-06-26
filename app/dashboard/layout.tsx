// import Sidebar from "../components/dashboard/layout/Sidebar";

// export default function DashboardLayout({children}: {children: React.ReactNode}) {
//     return (
//         <div className="flex">
//             <aside className="w-64 border-r min-h-screen p-4">
//                 <Sidebar/>
//             </aside>
//             <main className="flex-1 p-6">
//                 {children}
//             </main>
//         </div>
//     )
// }



"use client";

import MobileSidebar from "../components/dashboard/layout/MobileSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
        <MobileSidebar/>
        <main className="md:ml-64 p-6 pt-21 md:pt-6">
            {children}
        </main>
    </div>
  );
}