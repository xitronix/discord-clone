import { NavSidebar } from "@/components/navigation/NavSidebar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-20 z-30 flex-col fixed inset-y-0">
        <NavSidebar />
      </div>
      <main className="md:pl-20 h-full">{children}</main>
    </div>
  );
};

export default MainLayout;
