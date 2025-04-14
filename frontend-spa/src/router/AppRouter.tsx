import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "../home/pages/HomePage";
import { RegisterCustomerPage } from "../users/pages/RegisterCustomerPage";
import { MainLayout } from "../ui/layouts/MainLayout/MainLayout";
import { NavBar } from "../ui/components/Navbar/Navbar";
import { RechargeWalletPage } from "../wallets/pages/RechargeWalletPage";

export const AppRouter = () => {
  return (
    <main className="h-screen flex flex-col">
      <NavBar />
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/registrar-cliente" element={<RegisterCustomerPage />} />
          <Route path="/billeteras/recargas" element={<RechargeWalletPage />} />

          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </MainLayout>
    </main>
  );
};
