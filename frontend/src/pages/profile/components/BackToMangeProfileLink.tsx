import { useNavigate } from 'react-router-dom';
import { Anchor } from 'grommet';
import { FormPrevious } from 'grommet-icons';

interface BackToManageProfileLinkProps {
  label: string
}

const BackToManageProfileLink = ({ label }: BackToManageProfileLinkProps) => {
  const navigate = useNavigate();
  return (
    <Anchor
      icon={<FormPrevious />}
      label={label}
      onClick={() => {
        navigate("/profile");
      }}
      style={{ color: "#5A5A5A" }}
    />
  )
};

export default BackToManageProfileLink;