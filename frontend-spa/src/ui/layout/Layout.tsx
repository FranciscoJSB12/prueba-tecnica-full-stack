import { ReactNode } from "react";
import "./Layout.css";

interface Props {
  children: ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <main className="w-screen flex flex-col justify-center items-center h-screen layout">
      {children}
    </main>
  );
};
