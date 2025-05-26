import { Card, Col, Row, Statistic, Typography } from "antd";
import Container from "../components/container";
import type { IReport } from "../interfaces/report";

const data: IReport = {
  projects: {
    total: 10,
    in_progress: 5,
    planned: 3,
    completed: 2,
  },
  tasks: {
    total: 100,
    pending: 50,
    in_progress: 30,
    completed: 20,
  },
};

export default function Report() {
  return (
    <Container>
      <Typography.Title level={1}>Relatório</Typography.Title>

      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card variant="borderless">
            <Statistic title="Total de Projetos" value={data.projects.total} />
          </Card>
        </Col>

        <Col span={6}>
          <Card variant="borderless">
            <Statistic
              title="Projetos em Andamento"
              value={data.projects.in_progress}
            />
          </Card>
        </Col>

        <Col span={6}>
          <Card variant="borderless">
            <Statistic
              title="Projetos Concluídos"
              value={data.projects.completed}
            />
          </Card>
        </Col>

        <Col span={6}>
          <Card variant="borderless">
            <Statistic
              title="Projetos Planejados"
              value={data.projects.planned}
            />
          </Card>
        </Col>

        <Col span={6}>
          <Card variant="borderless">
            <Statistic title="Total de Tarefas" value={data.tasks.total} />
          </Card>
        </Col>

        <Col span={6}>
          <Card variant="borderless">
            <Statistic
              title="Tarefas em Andamento"
              value={data.tasks.in_progress}
            />
          </Card>
        </Col>

        <Col span={6}>
          <Card variant="borderless">
            <Statistic
              title="Tarefas Concluídos"
              value={data.tasks.completed}
            />
          </Card>
        </Col>

        <Col span={6}>
          <Card variant="borderless">
            <Statistic title="Tarefas Pendentes " value={data.tasks.pending} />
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
