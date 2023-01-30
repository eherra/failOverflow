import { Anchor } from 'grommet';
import { FormPrevious } from 'grommet-icons';
import { useNavigate } from 'react-router-dom';

interface IBackToFrontpageLink {
  label: string,
  link: string
}

const HeaderBackLink = ({ label, link }: IBackToFrontpageLink) => {
  const navigate = useNavigate();
  return (
    <Anchor
      icon={<FormPrevious />}
      label={label}
      onClick={() => {
        navigate(link);
      }}
      style={{ color: "#5A5A5A" }}
    />
  )
};

export default HeaderBackLink;