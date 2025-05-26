import { Popconfirm, Button } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import React from "react";

type DeleteActionButtonProps = {
  title?: string;
  description?: string;
  buttonText?: string;
  onConfirm?: (e?: React.MouseEvent<HTMLElement>) => void;
  onCancel?: (e?: React.MouseEvent<HTMLElement>) => void;
  onClick?: (e?: React.MouseEvent<HTMLElement>) => void;
};

const DeleteActionButton: React.FC<DeleteActionButtonProps> = ({
  title,
  description,
  onConfirm,
  onCancel,
  onClick,
  buttonText,
}) => {
  function handlePrependClick(e?: React.MouseEvent<HTMLElement>) {
    e?.preventDefault();
    e?.stopPropagation();
  }
  return (
    <Popconfirm
      title={title ?? "Deletar item"}
      description={
        description ?? "Tem certeza de que deseja excluir este item?"
      }
      icon={<QuestionCircleOutlined style={{ color: "red" }} />}
      placement="left"
      onCancel={(e) => {
        handlePrependClick(e);
        onCancel?.(e);
      }}
      onConfirm={(e) => {
        handlePrependClick(e);
        onConfirm?.(e);
      }}
    >
      <Button
        type="text"
        danger
        onClick={(e) => {
          handlePrependClick(e);
          onClick?.(e);
        }}
      >
        {buttonText ?? "Excluir"}
      </Button>
    </Popconfirm>
  );
};

export default DeleteActionButton;
