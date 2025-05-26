import type React from "react";

type DateFieldProps = {
  value?: string;
};

export const DateField: React.FC<DateFieldProps> = ({ value }) => {
  return (
    <span>{value ? new Date(value).toLocaleDateString("pt-BR") : ""}</span>
  );
};
