import { Button, Link, Typography } from '@mui/material';
import logo from '../../assets/images/event.jpeg';
import {
  StyledLinkDiv,
  StyledNavigation,
  StyledTitleDiv,
} from './Header.styled';
import { Link as RouterLink, useLocation } from 'react-router-dom';

const Header = () => {
  const { pathname } = useLocation();

  const pathnameForDataSelection = pathname.replace(/[0-9]/g, '');

  const routeData = () => {
    switch (pathname) {
      case '/':
        return {
          links: ['Users', 'Events'],
          title: 'Users list',
          button: ['Add User'],
        };

      case '/loginorgpage':
        return {
          links: ['Users', 'Logs'],
          title: 'Event Records',
          button: ['Add prescription', 'Add Login'],
        };

      default:
        break;
    }
  };

  return (
    <>
      <StyledNavigation>
        <Link component={RouterLink} to='/'>
          <img src={logo} alt='event logo' />;
        </Link>
        <StyledLinkDiv>
          {routeData().links.map((link) => (
            <Link
              key={link}
              underline='none'
              fontWeight={600}
              component={RouterLink}
              to='/'
            >
              {link}
            </Link>
          ))}
        </StyledLinkDiv>
      </StyledNavigation>
      <StyledTitleDiv>
        <Typography variant='h3'>{routeData().title}</Typography>
        <StyledLinkDiv>
          {routeData().button.map((button) => (
            <Button key={button} variant='contained'>
              {button}
            </Button>
          ))}
        </StyledLinkDiv>
      </StyledTitleDiv>
    </>
  );
};

export default Header;
