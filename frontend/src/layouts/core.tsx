import { Layout } from "antd";
import { HeaderComponent, SidebarComponent } from "../components";
import { Content, Footer } from "antd/es/layout/layout";
import RoutesProvider from "../routes/routes";
import { useMicrogrid } from "../context/useMicrogridContext";

// Fixed sidebar on left and fixed header on top
const CoreLayout = () => {
  const { collapsed } = useMicrogrid();
  return (
    <Layout hasSider className="h-auto min-h-screen w-full font-serif">
      <SidebarComponent />
      <Layout
        style={{
          transition: "margin-left .2s",
          marginLeft: collapsed ? 80 : 200,
        }}
        className="flex min-h-screen w-full !min-w-[600px] flex-col justify-between"
      >
        <HeaderComponent />
        <Content className="mt-16 h-full w-full bg-white">
          <RoutesProvider />
        </Content>
        <Footer> Microgird Designs™©</Footer>
      </Layout>
    </Layout>
  );
};

export default CoreLayout;
