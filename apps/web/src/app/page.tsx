import Link from "next/link";
import { prisma } from "@repo/database";
import { ThemeToggle } from "@/components/theme-toggle";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const user = await prisma.user.findFirst({
    where: { email: "abhijiththirutheri@gmail.com" },
    include: { tenant: true }
  });

  const tenantName = user?.tenant?.name || "Enterprise Edition 2.0";

  const modules = [
    { name: "User Management", path: "/users", icon: "🛡️", color: "from-slate-600 to-zinc-900", stats: "RBAC Active" },
    { name: "Website Builder", path: "/website", icon: "🌐", color: "from-cyan-400 to-blue-600", stats: "3 Pages Live" },
    { name: "Communications", path: "/communications", icon: "💬", color: "from-sky-400 to-blue-600", stats: "API Active" },
    { name: "Enrollments", path: "/admissions", icon: "🎓", color: "from-red-500 to-rose-600", stats: "15 Pending" },
    { name: "Programs", path: "/academic", icon: "📘", color: "from-blue-400 to-indigo-600", stats: "Curriculum Live" },
    { name: "Attendance", path: "/attendance", icon: "📅", color: "from-blue-500 to-indigo-600", stats: "92% Avg" },
    { name: "Examinations", path: "/examinations", icon: "📝", color: "from-indigo-500 to-purple-600", stats: "Mid-Terms Active" },
    { name: "Finance", path: "/finance", icon: "💰", color: "from-emerald-400 to-green-600", stats: "2 Due Invoices" },
    { name: "Hostel", path: "/hostel", icon: "🏨", color: "from-orange-400 to-amber-600", stats: "Room 204" },
    { name: "HRMS", path: "/hrms", icon: "💼", color: "from-teal-400 to-cyan-600", stats: "Payroll & Leaves" },
    { name: "Library", path: "/library", icon: "📚", color: "from-fuchsia-500 to-pink-600", stats: "0 Borrowed" },
    { name: "Transport", path: "/transport", icon: "🚌", color: "from-yellow-400 to-orange-500", stats: "Unallocated" },
    { name: "SocialHub", path: "/social", icon: "📱", color: "from-indigo-400 to-purple-600", stats: "SMMP Active" },
    { name: "SaaS Admin", path: "/saas", icon: "☁️", color: "from-slate-700 to-black", stats: "Multi-Tenant" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black font-sans relative overflow-hidden flex flex-col custom-scrollbar">
      {/* Background decoration */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/10 blur-3xl opacity-30 pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-500/10 blur-3xl opacity-30 pointer-events-none" />

      {/* Top Navigation / User Profile */}
      <div className="w-full max-w-7xl mx-auto px-6 py-6 flex justify-end items-center relative z-20">
        <div className="flex items-center gap-4 bg-white/70 dark:bg-zinc-900/50 backdrop-blur-md px-4 py-2 rounded-2xl border border-white dark:border-zinc-800 shadow-sm">
          
          <ThemeToggle />

          <div className="relative group">
            <button className="p-2 relative text-zinc-500 dark:text-zinc-400 dark:text-zinc-400 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 transition-all duration-300 bg-white dark:bg-zinc-900/50 backdrop-blur-md/50 hover:bg-white dark:bg-zinc-900/50 backdrop-blur-md dark:bg-zinc-800/30 dark:hover:bg-zinc-800 backdrop-blur-md rounded-xl shadow-sm hover:shadow-md border border-white/40 dark:border-white/5">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-zinc-900 shadow-[0_0_8px_rgba(239,68,68,0.6)] animate-pulse"></span>
            </button>
            {/* Dropdown */}
            <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-zinc-900/50 backdrop-blur-md/80 dark:bg-zinc-900/80 backdrop-blur-md rounded-2xl shadow-2xl border border-white/40 dark:border-zinc-700/50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 transform origin-top-right scale-95 group-hover:scale-100">
              <div className="p-4 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
                <h3 className="font-semibold text-zinc-900 dark:text-white">Notifications</h3>
                <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">Mark all read</button>
              </div>
              <div className="max-h-80 overflow-y-auto">
                <div className="p-4 border-b border-zinc-50 dark:border-zinc-800/50 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 dark:bg-zinc-950 dark:hover:bg-zinc-800/40 dark:bg-zinc-950 dark:hover:bg-zinc-800/50 cursor-pointer transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 shrink-0 h-2 w-2 rounded-full bg-blue-500"></div>
                    <div>
                      <p className="text-sm text-zinc-800 dark:text-zinc-200 dark:text-zinc-200 dark:text-zinc-200 font-medium">New Student Enrollment</p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 dark:text-zinc-400 mt-1">Pending approval for BCA batch.</p>
                      <p className="text-[10px] text-zinc-400 mt-2 uppercase font-semibold">2 mins ago</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-3 border-t border-zinc-100 dark:border-zinc-800 text-center">
                <button className="text-sm text-zinc-500 dark:text-zinc-400 dark:text-zinc-400 hover:text-zinc-700 dark:text-zinc-300 dark:text-zinc-300 font-medium">View all notifications</button>
              </div>
            </div>
          </div>

          <div className="w-px h-8 bg-zinc-200 dark:bg-zinc-800 mx-1"></div>

          <div className="flex flex-col text-right hidden sm:flex">
            <span className="text-sm font-bold text-zinc-900 dark:text-white">Abhijith Thirutheri</span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">Super Admin</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-blue-500/20">
            A
          </div>
          <div className="w-px h-8 bg-zinc-200 dark:bg-zinc-800 mx-1"></div>
          <Link 
            href="/login" 
            className="text-sm font-semibold text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 transition-colors flex items-center gap-1 bg-rose-50 dark:bg-rose-900/20 px-3 py-1.5 rounded-xl border border-rose-100 dark:border-rose-900/50"
          >
            Logout
          </Link>
        </div>
      </div>

      <header className="max-w-7xl mx-auto mb-16 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold text-sm mb-6 border border-blue-100 dark:border-blue-800">
          {user?.tenant?.logoUrl && (
            <img src={user.tenant.logoUrl} alt={tenantName} className="w-5 h-5 rounded-full object-cover border border-blue-200 dark:border-blue-700" />
          )}
          {tenantName}
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-6">
          ASAP Kerala
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
          Your centralized hub for academic, administrative, and campus operations.
        </p>
      </header>

      <main className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {modules.map((mod) => (
            <Link 
              key={mod.name} 
              href={mod.path}
              className="group relative overflow-hidden rounded-3xl bg-white/70 dark:bg-zinc-900/50 backdrop-blur-md p-6 shadow-sm border border-white dark:border-zinc-800 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 flex flex-col justify-between min-h-[220px]"
            >
              {/* Animated Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${mod.color} opacity-0 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div className={`w-14 h-14 flex items-center justify-center rounded-2xl text-2xl bg-gradient-to-br ${mod.color} text-white shadow-lg shadow-${mod.color.split('-')[1]}/30 transform group-hover:scale-110 transition-transform duration-500`}>
                    {mod.icon}
                  </div>
                  <div className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full text-xs font-semibold text-zinc-600 dark:text-zinc-300">
                    {mod.stats}
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-zinc-900 group-hover:to-zinc-500 dark:group-hover:from-white dark:group-hover:to-zinc-400 transition-all duration-300">
                  {mod.name}
                </h2>
              </div>
              
              <div className="relative z-10 flex items-center text-sm font-medium text-zinc-500 dark:text-zinc-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Explore Module
                <span className="ml-2 transform translate-x-0 group-hover:translate-x-2 transition-transform duration-300">→</span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
