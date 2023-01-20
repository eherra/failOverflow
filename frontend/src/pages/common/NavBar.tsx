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

        <Link to="/"><Button active color="default" label="Home" /></Link>
        <Link to="/failures"><Button color="default" label="Failures" /></Link>
        <Link to="/login"><Button color="default" label="Login" /></Link>
        <Link to="/profile"><Button color="default" label="Profile" /></Link>
        <Link to="/landing"><Button color="default" label="Landing Page" /></Link>
        <button type="button">Logout</button>
      </Box>
    </>
  )
};

export default NavBar;