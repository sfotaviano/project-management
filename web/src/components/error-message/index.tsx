type ErrorMessageProps = {
  message?: string | null;
  style?: React.CSSProperties;
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, style }) => {
  if (!message) return null;
  return (
    <span
      style={{ textAlign: "center", marginTop: 24, display: "block", ...style }}
    >
      {message}
    </span>
  );
};

export default ErrorMessage;
