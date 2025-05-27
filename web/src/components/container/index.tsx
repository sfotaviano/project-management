type ContainerProps = {
  children: React.ReactNode | React.ReactNode[];
};

export const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div style={{ padding: "20px 20px 24px 20px", margin: "0 auto" }}>{children}</div>;
};
export default Container;
