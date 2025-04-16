import type { Metadata } from "next";
import { DashboardHeader } from "./components/header";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <DashboardHeader />
        {children}
    </>
  );
}
