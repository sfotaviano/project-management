import { Table } from "antd";
import Container from "../components/container";
import type { ITask } from "../interfaces/task";
import { DateField } from "../components/date-filed";
import { useState } from "react";
import { Header } from "../components/header";
import DeleteActionButton from "../components/delete-action-button";
import { formatTaskStatusLabel } from "../utils/taskUtil";
import { TaskFormModal } from "../components/modals/TaskFormModal";

const { Column } = Table;

const data: ITask[] = [
  {
    id: 1,
    project_id: 1,
    title: "Task Alpha",
    description: "This is the first task.",
    completed_date: "2023-01-01",
    status: "pending",
    created_at: "2023-01-01T00:00:00Z",
    updated_at: "2023-01-01T00:00:00Z",
  },
  {
    id: 2,
    project_id: 1,
    title: "Task Beta",
    description: "This is the second task.",
    completed_date: "2023-02-01",
    status: "in_progress",
    created_at: "2023-02-01T00:00:00Z",
    updated_at: "2023-02-01T00:00:00Z",
  },
  {
    id: 3,
    project_id: 1,
    title: "Task Gamma",
    description: "This is the third task.",
    completed_date: "2023-03-01",
    status: "completed",
    created_at: "2023-03-01T00:00:00Z",
    updated_at: "2023-03-01T00:00:00Z",
  },
];

type TaskFormModalProps = {
  open: boolean;
  id: number | null;
  type: "create" | "edit" | null;
};

export default function Task() {
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [formModal, setFormModal] = useState<TaskFormModalProps>({
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
      alert(`Deleting task with ID: ${deleteId}`);
    }
    setDeleteId(null);
  };

  return (
    <Container>
      <Header
        title="Tarefas"
        buttonText="Criar tarefa"
        onButtonClick={() => handleOpenFormModal(null, "create")}
      />

      <Table<ITask>
        dataSource={data}
        pagination={false}
        onRow={(record) => ({
          onClick: () => handleOpenFormModal(record.id, "edit"),
        })}
      >
        <Column title="Título" dataIndex="title" key="title" />
        <Column
          title="Descrição"
          dataIndex="description"
          key="description"
          width={"30%"}
        />
        <Column
          title="Data de Criação"
          dataIndex="created_at"
          key="created_at"
          render={(text) => <DateField value={text} />}
        />
        <Column
          title="Data de Conclusão"
          dataIndex="completed_date"
          key="completed_date"
          render={(text) => <DateField value={text} />}
        />
        <Column
          title="Status"
          dataIndex="status"
          key="status"
          render={(value: string) => formatTaskStatusLabel(value)}
        />
        <Column
          title="Ação"
          key="action"
          render={(value: unknown, record: ITask) => (
            <DeleteActionButton
              title="Excluir a tarefa"
              description="Tem certeza de que deseja excluir esta tarefa?"
              onCancel={() => setDeleteId(null)}
              onConfirm={() => handleDeleteConfirm()}
              onClick={() => setDeleteId(record.id)}
            />
          )}
        />
      </Table>

      <TaskFormModal
        taskId={formModal.id}
        open={formModal.open}
        onCancel={handleCloseFormModal}
      />
    </Container>
  );
}
