import { Table } from "antd";
import Container from "../components/container";
import type { ITask } from "../interfaces/task";
import { DateField } from "../components/date-filed";
import { useState } from "react";
import { Header } from "../components/header";
import DeleteActionButton from "../components/delete-action-button";
import { formatTaskStatusLabel } from "../utils/taskUtil";
import { TaskFormModal } from "../components/modals/TaskFormModal";
import useFeatch from "../hooks/useFeatch";
import { deleteTask, getTasks } from "../services/task";
import ErrorMessage from "../components/error-message";

const { Column } = Table;

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

  const { data, error, isLoading, refeatch } = useFeatch(getTasks);

  const handleOpenFormModal = (id: number | null, type: "create" | "edit") => {
    setFormModal({ open: true, id, type });
  };

  const handleCloseFormModal = () => {
    setFormModal({ open: false, id: null, type: null });
  };

  const handleDeleteConfirm = async () => {
    if (deleteId !== null) {
      await deleteTask(deleteId);
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
        loading={isLoading}
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
              onConfirm={handleDeleteConfirm}
              onClick={() => setDeleteId(record.id)}
            />
          )}
        />
      </Table>

      <TaskFormModal
        taskId={formModal.id}
        open={formModal.open}
        onCancel={handleCloseFormModal}
        onSuccess={refeatch}
      />
    </Container>
  );
}
