import getInitialProfile from "@/lib/user/initial-profile";
import Sidebar from "@/app/(home)/components/sidebar";
import ChatSection from "@/app/(home)/components/chat-section";
import { redirect } from "next/navigation";
import { getSession } from "@auth0/nextjs-auth0";
import { ModeToggle } from "@/components/shared/ToggleTheme";


export default async function Index() {
  await getInitialProfile()
  const profile = await getSession();

  if (!profile) {
    return redirect("/auth")
  }

  return (
    <div className="flex">
      <div className="hidden sm:block">
        <Sidebar />
      </div>
      <ModeToggle />
      <ChatSection />
    </div>
  );
}