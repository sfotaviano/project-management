import { LogoutOutlined } from "@ant-design/icons";
import { Avatar, Button, Flex, Tooltip, Typography } from "antd";

type HeaderMenuProps = {
  onLogout?: () => void;
};

export const HeaderMenu: React.FC<HeaderMenuProps> = ({ onLogout }) => {
  return (
    <Flex justify="flex-end" align="center" style={{ height: "100%" }} gap={16}>
      <Avatar>SF</Avatar>
      <Typography.Text strong>Samuel Fernandes</Typography.Text>
      <Tooltip title="Sair">
        <Button
          danger
          type="text"
          icon={<LogoutOutlined />}
          onClick={onLogout}
        />
      </Tooltip>
    </Flex>
  );
};
export default HeaderMenu;
