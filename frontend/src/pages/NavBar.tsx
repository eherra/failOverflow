import { Link } from "react-router-dom";
import { Box } from 'grommet';

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

        <Link to="/">Home</Link>
        <Link to="/failures">Failures</Link>
        <Link to="/login">login</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/landing">Landing Page</Link>
        <button type="button">Logout</button>
      </Box>
    </>
  )
};

export default NavBar;