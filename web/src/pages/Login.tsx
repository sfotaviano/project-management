import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Flex,
  Layout,
  Typography,
  Card,
  notification,
} from "antd";
import { Link } from "react-router";
import { useAuth } from "../contexts/auth";

type FormValues = {
  email: string;
  password: string;
};

export default function Login() {
  const [form] = Form.useForm();
  const { login } = useAuth();

  const [api, contextHolder] = notification.useNotification();

  const onFinish = async (values: FormValues) => {
    try {
      // await login(values.email, values.password);
      await Promise.resolve(() => setTimeout(() => {}, 5000));
    } catch (error) {
      console.error(error);

      api.error({
        message: (error as any)?.response?.data?.message,
        description: "Erro ao tentar logar com as credenciais fornecidas",
      });
    }
  };

  return (
    <Layout style={{ height: "100vh" }}>
      {contextHolder}
      <Card
        title={<Typography.Title level={2}>Entrar</Typography.Title>}
        variant="borderless"
        style={{ width: 460, margin: "auto" }}
        styles={{ header: { border: "none" } }}
      >
        <Form<FormValues>
          name="login"
          form={form}
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item name="email" rules={[{ required: true, type: "email" }]}>
            <Input prefix={<UserOutlined />} placeholder="E-mail" />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true }]}>
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              placeholder="Senha"
            />
          </Form.Item>

          <Form.Item>
            <Flex vertical align="center" gap={20}>
              <Button block type="primary" htmlType="submit">
                Entrar
              </Button>
              <span>
                ou <Link to="/signup">Registre-se agora!</Link>
              </span>
            </Flex>
          </Form.Item>
        </Form>
      </Card>
    </Layout>
  );
}
