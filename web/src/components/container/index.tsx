type ContainerProps = {
  children: React.ReactNode | React.ReactNode[];
};

export const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div style={{ padding: "0 20px", margin: "0 auto" }}>{children}</div>;
};
export default Container;
