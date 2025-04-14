import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "../home/pages/HomePage";
import { RegisterCustomerPage } from "../users/pages/RegisterCustomerPage";
import { MainLayout } from "../ui/layouts/MainLayout/MainLayout";
import { NavBar } from "../ui/components/Navbar/Navbar";

export const AppRouter = () => {
  return (
    <main className="h-screen flex flex-col">
      <NavBar />
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route
            path="/registrar-cliente"
            element={<RegisterCustomerPage />}
          ></Route>

          <Route path="/*" element={<Navigate to="/" />}></Route>
        </Routes>
      </MainLayout>
    </main>
  );
};
