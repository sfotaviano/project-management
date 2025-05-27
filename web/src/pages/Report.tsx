import { Card, Col, Row, Statistic } from "antd";
import Container from "../components/container";
import useFeatch from "../hooks/useFeatch";
import { getReportSummary } from "../services/report";
import { Header } from "../components/header";
import ErrorMessage from "../components/error-message";

export default function Report() {
  const { data: summary, error, isLoading } = useFeatch(getReportSummary);

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <Container>
      <Header title="Relatório" buttonHidden />

      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card variant="borderless">
            <Statistic
              title="Total de Projetos"
              value={summary?.projects.total ?? 0}
              loading={isLoading}
            />
          </Card>
        </Col>

        <Col span={6}>
          <Card variant="borderless">
            <Statistic
              title="Projetos em Andamento"
              value={summary?.projects.in_progress ?? 0}
              loading={isLoading}
            />
          </Card>
        </Col>

        <Col span={6}>
          <Card variant="borderless">
            <Statistic
              title="Projetos Concluídos"
              value={summary?.projects.completed ?? 0}
              loading={isLoading}
            />
          </Card>
        </Col>

        <Col span={6}>
          <Card variant="borderless">
            <Statistic
              title="Projetos Planejados"
              value={summary?.projects.planned ?? 0}
              loading={isLoading}
            />
          </Card>
        </Col>

        <Col span={6}>
          <Card variant="borderless">
            <Statistic
              title="Total de Tarefas"
              value={summary?.tasks.total ?? 0}
              loading={isLoading}
            />
          </Card>
        </Col>

        <Col span={6}>
          <Card variant="borderless">
            <Statistic
              title="Tarefas em Andamento"
              value={summary?.tasks.in_progress ?? 0}
              loading={isLoading}
            />
          </Card>
        </Col>

        <Col span={6}>
          <Card variant="borderless">
            <Statistic
              title="Tarefas Concluídos"
              value={summary?.tasks.completed ?? 0}
              loading={isLoading}
            />
          </Card>
        </Col>

        <Col span={6}>
          <Card variant="borderless">
            <Statistic
              title="Tarefas Pendentes "
              value={summary?.tasks.pending ?? 0}
              loading={isLoading}
            />
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
