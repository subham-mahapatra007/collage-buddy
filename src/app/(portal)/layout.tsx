import { getSession, clearSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import TopNavbar from "@/components/TopNavbar";
import { cookies } from "next/headers";

async function logoutAction() {
  "use server";
  const cookieStore = await cookies();
  cookieStore.delete("session");
  redirect("/login");
}

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  // Route guard: if no session, redirect to login page immediately
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-zinc-950 text-white relative">
      {/* Visual background details */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-blue-600/5 blur-[120px] pointer-events-none" />
      
      {/* Sidebar navigation */}
      <Sidebar user={session} onLogout={logoutAction} />

      {/* Main content viewport */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopNavbar user={session} onLogout={logoutAction} />
        
        {/* Main scrollable body */}
        <main className="flex-1 p-6 overflow-y-auto max-w-[1600px] w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
