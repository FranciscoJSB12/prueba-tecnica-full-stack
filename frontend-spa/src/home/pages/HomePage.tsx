import { useNavigate } from "react-router-dom";
import { List, Button } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  WalletOutlined,
  CreditCardOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import { CustomCard } from "../../ui/components/CustomCard/Card";
import "./HomePage.css";

const menuOptions = [
  {
    icon: <UserOutlined className="text-primary" />,
    text: "Clientes",
    actions: [{ text: "Registar", link: "registrar-cliente" }],
  },
  {
    icon: <WalletOutlined className="text-primary" />,
    text: "Billeteras",
    actions: [
      { text: "Recargar", link: "billeteras/recargas" },
      { text: "Consultar saldo", link: "registrar-cliente" },
    ],
  },
  {
    icon: <CreditCardOutlined className="text-primary" />,
    text: "Compras",
    actions: [
      { text: "Comprar", link: "registrar-cliente" },
      { text: "Confirmar Pago", link: "registrar-cliente" },
    ],
  },
];

export const HomePage = () => {
  const navigate = useNavigate();

  const navigateTo = (link: string) => {
    navigate(link);
  };

  return (
    <>
      <DollarOutlined className="text-light home-page__dollar-icon" />
      <CustomCard
        title="Inicio"
        icon={<HomeOutlined className="text-primary" />}
      >
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
                    onClick={() => navigateTo(a.link)}
                  >
                    {a.text}
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
      </CustomCard>
    </>
  );
};
