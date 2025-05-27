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
import type { AxiosError } from "axios";
import React from "react";
import { Link } from "react-router";
import type { ApiErrorResponse } from "../interfaces/api";
import { register } from "../services/auth";
import { useAuth } from "../contexts/auth";

type FormValues = {
  name: string;
  email: string;
  password: string;
};

export default function SignUp() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const { login } = useAuth();

  const onFinish = async (values: FormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      await register(values);
      await login(values.email, values.password);
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
        title={<Typography.Title level={2}>Registre-se</Typography.Title>}
        variant="borderless"
        style={{ width: 460, margin: "auto" }}
        styles={{ header: { border: "none" } }}
      >
        <Form<FormValues>
          name="signup"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="Nome completo"
            rules={[{ required: true }]}
          >
            <Input placeholder="Nome" />
          </Form.Item>

          <Form.Item
            name="email"
            label="E-mail"
            rules={[{ required: true, type: "email" }]}
          >
            <Input placeholder="E-mail" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Senha"
            rules={[{ required: true, min: 6 }]}
          >
            <Input.Password type="password" placeholder="Senha" />
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
                Registrar
              </Button>

              <Link style={{ textAlign: "center" }} to="/login">
                Fazer login!
              </Link>
            </Flex>
          </Form.Item>
        </Form>
      </Card>
    </Layout>
  );
}
