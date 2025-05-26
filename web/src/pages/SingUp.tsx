import { Button, Form, Input, Flex, Layout, Typography, Card } from "antd";
import { Link } from "react-router";

type FormValues = {
  email: string;
  password: string;
};

export default function SignUp() {
  const onFinish = (values: FormValues) => {
    console.log("Received values of form: ", values);
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
            <Flex vertical align="center" gap={20}>
              <Button block type="primary" htmlType="submit">
                Registrar
              </Button>
              <Link to="/login">Fazer login!</Link>
            </Flex>
          </Form.Item>
        </Form>
      </Card>
    </Layout>
  );
}
