import { SidebarItem } from "../components/SidebarItem";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
        <div className="w-72 border-r border-slate-300 min-h-screen mr-4 pt-28">
            <div>
                <SidebarItem href={"/dashboard"} title="Home" />
                <SidebarItem href={"/transfer"} title="Transfer" />
                <SidebarItem href={"/transactions"} title="Transactions" />
            </div>
        </div>
            {children}
    </div>
  );
}

