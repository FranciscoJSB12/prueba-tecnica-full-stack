import { ReactNode } from "react";
import "./MainLayout.css";

interface Props {
  children: ReactNode;
}

export const MainLayout = ({ children }: Props) => {
  return (
    <div className="w-screen flex flex-col justify-center items-center main-layout">
      {children}
    </div>
  );
};
