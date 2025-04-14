import { ReactNode } from "react";

interface Props {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}

export const CustomCard = ({ children, icon, title }: Props) => {
  return (
    <section className="w-1/2 border border-primary border-solid rounded h-content p-4 bg-light">
      <header>
        <h1 className="text-center mb-6">
          <span className="mr-6">{title}</span>
          <span>{icon}</span>
        </h1>
      </header>
      <div>{children}</div>
    </section>
  );
};
