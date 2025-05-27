import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  notification,
  Row,
  Select,
  Typography,
} from "antd";
import dayjs from "dayjs";
import React, { useCallback, useEffect, useState } from "react";
import type { ITask } from "../../interfaces/task";
import useFeatch from "../../hooks/useFeatch";
import { createTask, getTask, updateTask } from "../../services/task";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "../../interfaces/api";
import { getProjects } from "../../services/project";

type ModalProps = {
  open: boolean;
  onCancel: () => void;
  onSuccess?: () => void;
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
  onSuccess,
  taskId,
}) => {
  const [isSubmitting, setSubmitting] = useState(false);

  const [form] = Form.useForm();

  const [api, context] = notification.useNotification();

  const fetchTask = useCallback(() => getTask(taskId), [taskId]);

  const { data: task, isLoading } = useFeatch(fetchTask);

  const { data: projects, isLoading: isLoadingProjects } =
    useFeatch(getProjects);

  const onSubmit = async (values: FormValues) => {
    const data: Partial<ITask> = {
      project_id: values.project_id,
      title: values.title,
      description: values.description,
      completed_date: values.completed_date
        ? dayjs(values.completed_date).format("YYYY-MM-DD")
        : undefined,
      status: values.status,
    };

    if (isSubmitting) return;
    setSubmitting(true);

    try {
      if (taskId) await handleUpdate(taskId, data);
      else await handleCreate(data);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCreate = async (data: Partial<ITask>) => {
    try {
      await createTask(data);
      onSuccess?.();
      handleClose();
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      api.error({
        message: "Erro ao criar tarefa",
        description: axiosError?.response?.data?.message || "Erro desconhecido",
      });
    }
  };

  const handleUpdate = async (id: number, data: Partial<ITask>) => {
    try {
      await updateTask(id, data);
      onSuccess?.();
      handleClose();
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      api.error({
        message: "Erro ao salvar tarefa",
        description: axiosError?.response?.data?.message || "Erro desconhecido",
      });
    }
  };

  const handleClose = () => {
    form.resetFields();
    onCancel();
  };

  useEffect(() => {
    if (task) {
      form.setFieldValue("title", task.title);
      form.setFieldValue("description", task.description ?? undefined);
      form.setFieldValue("completed_date", task.completed_date ?? undefined);
      form.setFieldValue("status", task.status ?? undefined);
      form.setFieldValue("project_id", task.project_id);
    }
  }, [task]);

  return (
    <Modal
      title={
        <Typography.Title level={4} style={{ margin: 0 }}>
          {taskId ? "Editar tarefa" : "Criar tarefa"}
        </Typography.Title>
      }
      open={open}
      centered
      width={800}
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
          loading={isSubmitting}
        >
          {taskId ? "Salvar" : "Criar"}
        </Button>,
      ]}
      loading={isLoading}
      styles={{ header: { marginBottom: 20 } }}
    >
      {context}
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
              name="project_id"
              label="Projeto"
              rules={[{ required: true }]}
            >
              <Select placeholder="Selecione..." loading={isLoadingProjects}>
                {projects?.map((project, i) => (
                  <Select.Option key={i} value={project.id}>
                    {project.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="completed_date"
              label="Data de Conclusão"
              getValueProps={(value) => ({
                value: value ? dayjs(value) : undefined,
              })}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
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
