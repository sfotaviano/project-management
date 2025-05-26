import Container from "../components/container";
import { Table } from "antd";
import type { IProject } from "../interfaces/project";
import { DateField } from "../components/date-filed";
import { Header } from "../components/header";
import { useState } from "react";
import { ProjectFormModal } from "../components/modals/ProjectFormModal";
import DeleteActionButton from "../components/delete-action-button";
import { formatProjectStatusLabel } from "../utils/projectUtil";

const { Column } = Table;

const data: IProject[] = [
  {
    id: 1,
    name: "Project Alpha",
    description: "This is the first project.",
    start_date: "2023-01-01",
    end_date: "2023-12-31",
    status: "planned",
    location: "New York This is the first project.",
    created_at: "2023-01-01T00:00:00Z",
    updated_at: "2023-01-01T00:00:00Z",
  },
  {
    id: 2,
    name: "Project Beta",
    description: "This is the second project.",
    start_date: "2023-02-01",
    end_date: "2023-11-30",
    status: "in_progress",
    location: "Los Angeles",
    created_at: "2023-02-01T00:00:00Z",
    updated_at: "2023-02-01T00:00:00Z",
  },
  {
    id: 3,
    name: "Project Gamma",
    description: "This is the third project.",
    start_date: "2023-03-01",
    end_date: "2023-10-31",
    status: "completed",
    location: "Chicago",
    created_at: "2023-03-01T00:00:00Z",
    updated_at: "2023-03-01T00:00:00Z",
  },
];

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

  const handleOpenFormModal = (id: number | null, type: "create" | "edit") => {
    setFormModal({ open: true, id, type });
  };

  const handleCloseFormModal = () => {
    setFormModal({ open: false, id: null, type: null });
  };

  const handleDeleteConfirm = () => {
    if (deleteId !== null) {
      alert(`Deleting project with ID: ${deleteId}`);
    }
    setDeleteId(null);
  };

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
              onConfirm={() => handleDeleteConfirm()}
              onClick={() => setDeleteId(record.id)}
            />
          )}
        />
      </Table>

      <ProjectFormModal
        projectId={formModal.id}
        open={formModal.open}
        onCancel={handleCloseFormModal}
      />
    </Container>
  );
}
