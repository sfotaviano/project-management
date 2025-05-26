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
import type { ITask } from "../../interfaces/task";

type ModalProps = {
  open: boolean;
  onCancel: () => void;
  taskId?: number | null;
};

type FormValues = {
  project_id: number;
  title: string;
  description?: string;
  completed_date?: string;
  status?: string;
};

export const TaskFormModal: React.FC<ModalProps> = ({
  open,
  onCancel,
  taskId,
}) => {
  const [form] = Form.useForm();

  const onSubmit = (values: FormValues) => {
    const data: Partial<ITask> = {
      project_id: values.project_id,
      title: values.title,
      description: values.description,
      completed_date: values.completed_date,
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
          {taskId ? "Editar tarefa" : "Criar tarefa"}
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
          form="task-form"
          htmlType="submit"
        >
          {taskId ? "Salvar" : "Criar"}
        </Button>,
      ]}
      styles={{ header: { marginBottom: 20 } }}
    >
      <Form<FormValues>
        name="task-form"
        layout="vertical"
        onFinish={onSubmit}
        form={form}
      >
        <Form.Item
          name={"title"}
          label="Título"
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
              name="completed_date"
              label="Data de Conclusão"
              getValueProps={(value) => ({
                value: value && dayjs(Number(value)),
              })}
              normalize={(value) => value && `${dayjs(value).valueOf()}`}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="status" label="Status">
              <Select placeholder="Selecione...">
                <Select.Option value="pending">Pendente</Select.Option>
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
