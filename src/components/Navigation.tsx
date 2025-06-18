"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navigation = [
  { name: "Dashboard", href: "/" },
  { name: "Wallet", href: "/wallet" },
  { name: "Mobile Money", href: "/mobile" },
  { name: "Currency", href: "/convert" },
  { name: "Virtual Cards", href: "/cards" },
];

export function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  const navTextColor = "text-[#002A42]"; // your lumo primary navy

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#F05A28] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl font-serif">L</span>
              </div>
              <span className={`text-xl font-bold font-serif ${navTextColor}`}>lumo</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "inline-flex items-center px-1 pt-1 text-sm font-medium",
                    pathname === item.href
                      ? `border-b-2 border-[#F05A28] ${navTextColor}`
                      : `${navTextColor}/80 hover:border-b-2 hover:border-[#F05A28] hover:${navTextColor}`
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {status === "authenticated" ? (
              <>
                <button
                  type="button"
                  className={`rounded-full bg-[#FDF5E5] p-2 ${navTextColor}/80 hover:${navTextColor}`}
                >
                  <span className="sr-only">View notifications</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                  </svg>
                </button>

                <div className="ml-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex rounded-full bg-[#FDF5E5] text-sm focus:outline-none">
                      <div className="h-8 w-8 rounded-full bg-[#F05A28] flex items-center justify-center">
                        <span className="text-sm font-medium text-white">
                          {session.user?.name?.[0]?.toUpperCase() || "U"}
                        </span>
                      </div>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="w-56 bg-white border border-[#E0E0E0] shadow-lg rounded-lg">
                      <div className="px-4 py-3">
                        <p className={`text-sm ${navTextColor}/80`}>Signed in as</p>
                        <p className={`truncate text-sm font-medium ${navTextColor}`}>{session.user?.email}</p>
                      </div>
                      <DropdownMenuSeparator className="bg-[#E0E0E0]" />
                      <DropdownMenuItem onClick={() => router.push("/profile")} className={`${navTextColor}/80 hover:${navTextColor} hover:bg-[#F9F9F9]`}>
                        Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => router.push("/settings")} className={`${navTextColor}/80 hover:${navTextColor} hover:bg-[#F9F9F9]`}>
                        Settings
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-[#E0E0E0]" />
                      <DropdownMenuItem onClick={handleSignOut} className={`${navTextColor}/80 hover:${navTextColor} hover:bg-[#F9F9F9]`}>
                        Sign out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/login" className={`${navTextColor} hover:text-[#F05A28]`}>Sign in</Link>
                <Link href="/register" className="rounded-md bg-[#F05A28] px-4 py-2 text-sm font-medium text-white hover:bg-[#F9B233] hover:text-[#002A42] transition-all">Get started</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
