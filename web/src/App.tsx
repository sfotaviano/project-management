import { ConfigProvider } from "antd";
import ptBR from "antd/locale/pt_BR";
import "./App.css";
import Router from "./routes";

function App() {
  return (
    <ConfigProvider locale={ptBR}>
      <Router />
    </ConfigProvider>
  );
}

export default App;
