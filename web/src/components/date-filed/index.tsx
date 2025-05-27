import type React from "react";
import dayjs from "dayjs";

type DateFieldProps = {
  value?: string;
};

export const DateField: React.FC<DateFieldProps> = ({ value }) => {
  return <span>{value ? dayjs(value).format("DD/MM/YYYY") : ""}</span>;
};
