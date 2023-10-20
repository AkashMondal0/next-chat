import getInitialProfile from "@/lib/user/initial-profile";
import Sidebar from "@/app/(home)/components/sidebar";
import ChatSection from "@/app/(home)/components/chat-section";

export default async function index() {
  const user = await getInitialProfile()


  return (
    <div className="flex">
      <div className="hidden sm:block">
      <Sidebar />
      </div>
      <ChatSection />
    </div>
  );
}