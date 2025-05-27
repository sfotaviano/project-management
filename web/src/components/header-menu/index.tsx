import { LogoutOutlined } from "@ant-design/icons";
import { Avatar, Button, Flex, Tooltip, Typography } from "antd";
import { useAuth } from "../../contexts/auth";
import { getUserInitials } from "../../utils/userUtil";

type HeaderMenuProps = {
  onLogout?: () => void;
};

export const HeaderMenu: React.FC<HeaderMenuProps> = ({ onLogout }) => {
  const { user } = useAuth();

  const initials = getUserInitials(user?.name || user?.email);

  return (
    <Flex justify="flex-end" align="center" style={{ height: "100%" }} gap={16}>
      <Avatar>{initials}</Avatar>
      <Typography.Text strong>{user?.name || user?.email}</Typography.Text>
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
