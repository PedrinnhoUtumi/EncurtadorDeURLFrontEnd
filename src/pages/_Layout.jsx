import { Outlet } from "react-router-dom";
import React from "react" 

export function Layout() {
  return (
    <div
      className={`
        flex 
        min-[]:w-screen min-h-screen       
    `} 
    >
      <main className="flex flex-col flex-1">
        <Outlet />
      </main>
    </div>
  );
}