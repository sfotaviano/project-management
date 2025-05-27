import React from "react";
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import { Outlet, useNavigate } from "react-router";
import HeaderMenu from "../header-menu";
import { SidebarLogo } from "../sidebar-logo";
import { useAuth } from "../../contexts/auth";

const { Header, Content, Sider } = Layout;

const siderStyle: React.CSSProperties = {
  overflow: "auto",
  height: "100vh",
  position: "sticky",
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: "thin",
  scrollbarGutter: "stable",
};

const items: MenuProps["items"] = [
  { key: "projects", icon: <AppstoreOutlined />, label: "Projetos" },
  { key: "tasks", icon: <BarChartOutlined />, label: "Tarefas" },
  { key: "reports", icon: <CloudOutlined />, label: "Relatórios" },
];

const PrivateLayout: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { logout } = useAuth();

  const navigate = useNavigate();

  return (
    <Layout hasSider>
      <Sider style={siderStyle} width={240}>
        <SidebarLogo />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["projects"]}
          onClick={({ key }) => navigate("/" + key)}
          items={items}
        />
      </Sider>
      <Layout>
        <Header style={{ background: colorBgContainer }}>
          <HeaderMenu onLogout={logout} />
        </Header>
        <Content style={{ overflow: "initial" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default PrivateLayout;
