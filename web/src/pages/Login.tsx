import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Flex,
  Layout,
  Typography,
  Card,
  Alert,
} from "antd";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../contexts/auth";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "../interfaces/api";
import React from "react";

type FormValues = {
  email: string;
  password: string;
};

export default function Login() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const [form] = Form.useForm();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onFinish = async (values: FormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      await login(values.email, values.password);
      navigate("/projects", { replace: true });
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      setError(axiosError?.response?.data?.message || "Erro desconhecido");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout style={{ height: "100vh" }}>
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
            <Flex vertical gap={20}>
              {error && <Alert message={error} type="error" showIcon />}

              <Button
                block
                type="primary"
                htmlType="submit"
                loading={isLoading}
              >
                Entrar
              </Button>
              <span style={{ textAlign: "center" }}>
                ou <Link to="/signup">Registre-se agora!</Link>
              </span>
            </Flex>
          </Form.Item>
        </Form>
      </Card>
    </Layout>
  );
}
