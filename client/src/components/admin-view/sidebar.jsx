import { Link, useLocation } from "react-router";
import { ChartNoAxesCombined } from "lucide-react";
import { adminSidebarMenuItems } from "@/config";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";

function MenuItems({ setOpen }) {
  const location = useLocation();

  return (
    <nav className="mt-8 flex flex-col gap-2">
      {adminSidebarMenuItems.map(({ id, label, path, icon: Icon }) => (
        <Link
          key={id}
          to={path}
          className={`flex items-center gap-2 text-xl rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground ${
            location.pathname.includes(path) ? "!text-foreground bg-muted" : ""
          }`}
          onClick={() => (setOpen ? setOpen(false) : null)}
        >
          {Icon && <Icon />}
          <span>{label}</span>
        </Link>
      ))}
    </nav>
  );
}

const AdminSideBar = ({ open, setOpen }) => {
  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              <SheetTitle className="flex items-center gap-2 mt-5">
                <ChartNoAxesCombined size={30} />
                <span className="text-2xl font-extrabold">Admin Panel</span>
              </SheetTitle>
              <SheetDescription>
                Manage your application settings and content here.
              </SheetDescription>
            </SheetHeader>

            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>

      <aside className="hidden lg:flex w-64 flex-col border-r bg-background p-6">
        <Link to="/admin/dashboard" className="flex items-center gap-2">
          <ChartNoAxesCombined size={30} />
          <h1 className="text-2xl font-extrabold">Admin Panel</h1>
        </Link>

        <MenuItems />
      </aside>
    </>
  );
};

export default AdminSideBar;
