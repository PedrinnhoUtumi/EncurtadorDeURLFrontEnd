import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div
      className={`
        flex 
        w-screen min-h-screen       
    `}
    >
      <main className="flex flex-col flex-1">
        <Outlet />
      </main>
    </div>
  );
}