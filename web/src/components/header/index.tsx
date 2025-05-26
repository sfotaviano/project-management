import { Button, Flex, Typography } from "antd";
import React from "react";

type HeaderProps = {
  title?: string;
  buttonText?: string;
  onButtonClick?: () => void;
};

export const Header: React.FC<HeaderProps> = ({
  title,
  buttonText,
  onButtonClick,
}) => {
  return (
    <Flex align="center" justify="space-between" style={{ marginBottom: 20 }}>
      <Typography.Title level={2}>{title}</Typography.Title>
      <Button
        size="large"
        type="primary"
        onClick={onButtonClick}
        style={{ minWidth: 200 }}
      >
        {buttonText ?? "Criar"}
      </Button>
    </Flex>
  );
};
