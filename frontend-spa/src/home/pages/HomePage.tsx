import { List, Button } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  WalletOutlined,
  CreditCardOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import { Layout } from "../../ui/layout/Layout";
import "./HomePage.css";

const menuOptions = [
  {
    icon: <UserOutlined className="text-primary" />,
    text: "Usuarios",
    actions: ["Registar"],
  },
  {
    icon: <WalletOutlined className="text-primary" />,
    text: "Billeteras",
    actions: ["Recargar", "Consulta saldo"],
  },
  {
    icon: <CreditCardOutlined className="text-primary" />,
    text: "Compras",
    actions: ["Comprar", "Confirmar Pago"],
  },
];

export const HomePage = () => {
  return (
    <Layout>
      <DollarOutlined className="text-light home-page__dollar-icon" />
      <section className="w-1/2 border border-primary border-solid rounded h-content p-4 bg-light">
        <header>
          <h1 className="text-center">
            <span className="mr-6">Home</span>
            <span>
              <HomeOutlined className="text-primary" />
            </span>
          </h1>
        </header>
        <div>
          <List
            itemLayout="horizontal"
            dataSource={menuOptions}
            renderItem={(item) => (
              <List.Item
                actions={[
                  ...item.actions.map((a) => (
                    <Button
                      key="list-loadmore-edit"
                      color="primary"
                      variant="solid"
                    >
                      {a}
                    </Button>
                  )),
                ]}
              >
                <List.Item.Meta
                  avatar={item.icon}
                  title={<p>{item.text}</p>}
                  description=""
                />
              </List.Item>
            )}
          />
        </div>
      </section>
    </Layout>
  );
};
