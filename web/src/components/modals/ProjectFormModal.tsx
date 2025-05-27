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
import { zipCodeMask, zipCodeUnmask } from "../../utils/maskUtil";
import type { IProject } from "../../interfaces/project";
import {
  createProject,
  getProject,
  updateProject,
} from "../../services/project";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "../../interfaces/api";
import { getAddressByCep } from "../../services/cep";
import useFeatch from "../../hooks/useFeatch";

type ModalProps = {
  open: boolean;
  onCancel: () => void;
  onSuccess?: () => void;
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
  onSuccess,
  projectId,
}) => {
  const [isSubmitting, setSubmitting] = useState(false);

  const [form] = Form.useForm();

  const [api, context] = notification.useNotification();

  const fetchProject = useCallback(() => getProject(projectId), [projectId]);

  const { data: project, isLoading } = useFeatch(fetchProject);

  const onSubmit = async (values: FormValues) => {
    const data: Partial<IProject> = {
      name: values.name,
      description: values.description,
      start_date: values.start_date
        ? dayjs(values.start_date).format("YYYY-MM-DD")
        : undefined,
      end_date: values.end_date
        ? dayjs(values.end_date).format("YYYY-MM-DD")
        : undefined,
      location: values.location,
      status: values.status,
    };

    if (isSubmitting) return;
    setSubmitting(true);

    try {
      if (projectId) await handleUpdate(projectId, data);
      else await handleCreate(data);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCreate = async (data: Partial<IProject>) => {
    try {
      await createProject(data);
      onSuccess?.();
      handleClose();
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      api.error({
        message: "Erro ao criar projeto",
        description: axiosError?.response?.data?.message || "Erro desconhecido",
      });
    }
  };

  const handleUpdate = async (id: number, data: Partial<IProject>) => {
    try {
      await updateProject(id, data);
      onSuccess?.();
      handleClose();
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      api.error({
        message: "Erro ao salvar projeto",
        description: axiosError?.response?.data?.message || "Erro desconhecido",
      });
    }
  };

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawCep = zipCodeUnmask(e.target.value);
    if (/^\d{8}$/.test(rawCep)) {
      try {
        const data = await getAddressByCep(rawCep);
        const formatedAddres = `${data.logradouro}, ${data.bairro}, ${data.localidade}, ${data.estado}`;
        form.setFieldValue("location", formatedAddres);
      } catch (error) {
        const axiosError = error as AxiosError<ApiErrorResponse>;
        console.log(axiosError?.response?.data?.message);
      }
    }
  };

  const handleClose = () => {
    form.resetFields();
    onCancel();
  };

  useEffect(() => {
    if (project) {
      form.setFieldValue("name", project.name);
      form.setFieldValue("description", project.description ?? undefined);
      form.setFieldValue("start_date", project.start_date ?? undefined);
      form.setFieldValue("end_date", project.end_date ?? undefined);
      form.setFieldValue("status", project.status ?? undefined);
      form.setFieldValue("location", project.location ?? undefined);
    }
  }, [project]);

  return (
    <Modal
      title={
        <Typography.Title level={4} style={{ margin: 0 }}>
          {projectId ? "Editar projeto" : "Criar projeto"}
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
          form="project-form"
          htmlType="submit"
          loading={isSubmitting}
        >
          {projectId ? "Salvar" : "Criar"}
        </Button>,
      ]}
      loading={isLoading}
      styles={{ header: { marginBottom: 20 } }}
    >
      {context}
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
                value: value ? dayjs(value) : undefined,
              })}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="end_date"
              label="Data de Término"
              getValueProps={(value) => ({
                value: value ? dayjs(value) : undefined,
              })}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              name="cep"
              label="Cep"
              normalize={(value) => value && zipCodeMask(value)}
            >
              <Input
                placeholder="Pesquisar..."
                maxLength={9}
                onChange={handleCepChange}
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              name="location"
              label="Localização"
              extra="Digite o Cep para preencher a localização"
            >
              <Input placeholder="Localização será preenchida automaticamente" />
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
