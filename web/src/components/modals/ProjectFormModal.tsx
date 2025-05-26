import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Typography,
} from "antd";
import dayjs from "dayjs";
import React from "react";
import { zipCodeMask } from "../../utils/maskUtil";
import type { IProject } from "../../interfaces/project";

type ModalProps = {
  open: boolean;
  onCancel: () => void;
  projectId?: number | null;
};

type FormValues = {
  name: string;
  description?: string;
  start_date?: string;
  end_date?: string;
  location?: string;
  cep?: string;
  status?: string;
};

export const ProjectFormModal: React.FC<ModalProps> = ({
  open,
  onCancel,
  projectId,
}) => {
  const [form] = Form.useForm();

  const onSubmit = (values: FormValues) => {
    const data: Partial<IProject> = {
      name: values.name,
      description: values.description,
      start_date: values.start_date,
      end_date: values.end_date,
      location: values.location,
      status: values.status,
    };

    console.log("Form values:", values);
    console.log("Payload:", data);
  };

  const handleClose = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      title={
        <Typography.Title level={4} style={{ margin: 0 }}>
          {projectId ? "Editar projeto" : "Criar projeto"}
        </Typography.Title>
      }
      open={open}
      centered
      width={600}
      onCancel={handleClose}
      footer={[
        <Button key="cancel" onClick={handleClose}>
          Cancelar
        </Button>,
        <Button
          key="submit"
          type="primary"
          form="project-form"
          htmlType="submit"
        >
          {projectId ? "Salvar" : "Criar"}
        </Button>,
      ]}
      styles={{ header: { marginBottom: 20 } }}
    >
      <Form<FormValues>
        name="project-form"
        layout="vertical"
        onFinish={onSubmit}
        form={form}
      >
        <Form.Item
          name={"name"}
          label="Nome"
          rules={[{ required: true, max: 255 }]}
        >
          <Input placeholder="Digite..." />
        </Form.Item>

        <Form.Item name={"description"} label="Descrição">
          <Input.TextArea
            placeholder="Digite..."
            rows={5}
            maxLength={255}
            showCount
            autoSize={false}
            style={{ resize: "none" }}
          />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="start_date"
              label="Data de Início"
              getValueProps={(value) => ({
                value: value && dayjs(Number(value)),
              })}
              normalize={(value) => value && `${dayjs(value).valueOf()}`}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="end_date"
              label="Data de Término"
              getValueProps={(value) => ({
                value: value && dayjs(Number(value)),
              })}
              normalize={(value) => value && `${dayjs(value).valueOf()}`}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col span={16}>
            <Form.Item name="location" label="Localização">
              <Input placeholder="Digite..." />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              name="cep"
              label="Cep"
              normalize={(value) => value && zipCodeMask(value)}
            >
              <Input placeholder="Digite..." maxLength={9} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="status" label="Status">
              <Select placeholder="Selecione...">
                <Select.Option value="planned">Planejado</Select.Option>
                <Select.Option value="in_progress">Em andamento</Select.Option>
                <Select.Option value="completed">Concluído</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};
