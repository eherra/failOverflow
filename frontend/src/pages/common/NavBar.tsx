import { Link } from "react-router-dom";
import { Box, Header, Button } from 'grommet';

const NavBar = () => {
  return (
    <>
      <Box
        tag='header'
        direction='row'
        align='center'
        justify='between'
        background='#A7BEAE'
        pad='medium'
      >
        <Header>Failover Flow</Header>

        <Link to="/"><Button active size="medium" label="Home" /></Link>
        <Link to="/failures"><Button active size="medium" label="Failures" /></Link>
        <Link to="/login"><Button active size="medium" label="Login" /></Link>
        <Link to="/profile"><Button active size="medium" label="Profile" /></Link>
        <Link to="/landing"><Button active size="medium" label="Landing Page" /></Link>
        <button type="button">Logout</button>
      </Box>
    </>
  )
};

export default NavBar;