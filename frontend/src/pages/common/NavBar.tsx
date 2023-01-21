import { Link } from "react-router-dom";
import { Box, Header, Button } from 'grommet';

const isLoggedIn = true;

const NavBar = () => {

  return (
    <>
      <Box
        tag='header'
        direction='row'
        background='#A7BEAE'
        pad='medium'
      >
        <Header style={{ marginRight: "2em" }}><b>Fail Overflow</b></Header>
        {isLoggedIn ? (
          <>
            <Link to="/"><Button hoverIndicator label="Home" /></Link>
            <Link to="/failures"><Button hoverIndicator label="Failures" /></Link>
            <Link to="/login"><Button hoverIndicator label="Login" /></Link>
            <Link to="/profile"><Button hoverIndicator label="Profile" /></Link>
            <Link to="/landing"><Button hoverIndicator label="Landing Page" /></Link>
            <Button alignSelf='end' type="button" label="Logout" color="fffff" />
          </>
        ) : (
          <Box direction="row">
            <Button hoverIndicator label="Sign in" />
            <Button hoverIndicator color="fffff" label="Create account" style={{ background: 'white' }} />
          </Box>
        )}
      </Box>
    </>
  )
};

export default NavBar;