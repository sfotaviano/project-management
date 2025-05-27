import Container from "../components/container";
import { Table } from "antd";
import type { IProject } from "../interfaces/project";
import { DateField } from "../components/date-filed";
import { Header } from "../components/header";
import { useState } from "react";
import { ProjectFormModal } from "../components/modals/ProjectFormModal";
import DeleteActionButton from "../components/delete-action-button";
import { formatProjectStatusLabel } from "../utils/projectUtil";
import useFeatch from "../hooks/useFeatch";
import { deleteProject, getProjects } from "../services/project";
import ErrorMessage from "../components/error-message";

const { Column } = Table;

type ProjectFormModalProps = {
  open: boolean;
  id: number | null;
  type: "create" | "edit" | null;
};

export default function Project() {
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [formModal, setFormModal] = useState<ProjectFormModalProps>({
    open: false,
    id: null,
    type: null,
  });

  const { data, error, isLoading, refeatch } = useFeatch(getProjects);

  const handleOpenFormModal = (id: number | null, type: "create" | "edit") => {
    setFormModal({ open: true, id, type });
  };

  const handleCloseFormModal = () => {
    setFormModal({ open: false, id: null, type: null });
  };

  const handleDeleteConfirm = async () => {
    if (deleteId !== null) {
      await deleteProject(deleteId);
      refeatch();
    }
    setDeleteId(null);
  };

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <Container>
      <Header
        title="Projetos"
        buttonText="Criar projeto"
        onButtonClick={() => handleOpenFormModal(null, "create")}
      />

      <Table<IProject>
        dataSource={data}
        pagination={false}
        onRow={(record) => ({
          onClick: () => handleOpenFormModal(record.id, "edit"),
        })}
        loading={isLoading}
      >
        <Column title="Nome" dataIndex="name" key="name" />
        <Column
          title="Descrição"
          dataIndex="description"
          key="description"
          width={"30%"}
        />
        <Column
          title="Data de Início"
          dataIndex="start_date"
          key="start_date"
          render={(text) => <DateField value={text} />}
        />
        <Column
          title="Data de Término"
          dataIndex="end_date"
          key="end_date"
          render={(text) => <DateField value={text} />}
        />
        <Column
          title="Status"
          dataIndex="status"
          key="status"
          render={(value: string) => formatProjectStatusLabel(value)}
        />
        <Column
          title="Localização"
          dataIndex="location"
          key="location"
          width={"20%"}
        />
        <Column
          title="Ação"
          key="action"
          render={(value: unknown, record: IProject) => (
            <DeleteActionButton
              title="Excluir a projeto"
              description="Tem certeza de que deseja excluir esta projeto?"
              onCancel={() => setDeleteId(null)}
              onConfirm={handleDeleteConfirm}
              onClick={() => setDeleteId(record.id)}
            />
          )}
        />
      </Table>

      <ProjectFormModal
        projectId={formModal.id}
        open={formModal.open}
        onCancel={handleCloseFormModal}
        onSuccess={refeatch}
      />
    </Container>
  );
}
