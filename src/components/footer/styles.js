import styled from 'styled-components';

import { Navbar } from 'react-bulma-components';

export const StyledNavbarItem = styled(Navbar.Item)`
  color: ${props => props.active ? '#00d1b2' : '#a5a5a5'};
`;
