import { Menu, MenuProps } from "antd";
import {
  CreditCardOutlined,
  HomeOutlined,
  UserOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    label: <Link to="/">Inicio</Link>,
    key: "home",
    icon: <HomeOutlined />,
  },
  {
    label: "Clientes",
    key: "users",
    icon: <UserOutlined />,
    children: [
      { label: <Link to="/registrar-cliente">Registrar</Link>, key: "users:1" },
    ],
  },
  {
    label: "Billeteras",
    key: "wallets",
    icon: <WalletOutlined />,
    children: [
      {
        label: <Link to="/billeteras/recargas">Recargar</Link>,
        key: "wallets:1",
      },
      {
        label: <Link to="/billeteras/saldo">Consultar Saldo</Link>,
        key: "wallets:2",
      },
    ],
  },
  {
    label: "Compras",
    key: "payments",
    icon: <CreditCardOutlined />,
    children: [
      {
        label: <Link to="/pagos/nueva-compra">Comprar</Link>,
        key: "payments:1",
      },
      {
        label: <Link to="/pagos/confirmar">Confirmar pago</Link>,
        key: "payments:2",
      },
    ],
  },
];

export const NavBar = () => {
  return (
    <div className="navbar">
      <Menu mode="horizontal" items={items} />
    </div>
  );
};
