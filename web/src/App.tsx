import { ConfigProvider } from "antd";
import ptBR from "antd/locale/pt_BR";
import "./App.css";
import Router from "./routes";
import { AuthProvider } from "./contexts/auth";

function App() {
  return (
    <ConfigProvider locale={ptBR}>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </ConfigProvider>
  );
}

export default App;
