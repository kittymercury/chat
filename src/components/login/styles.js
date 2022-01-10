import styled from 'styled-components';

import { Section } from 'react-bulma-components';

export const StyledSection = styled(Section)`
  background-color: ${props => {
    if (props.placeholder === 'Your login') {
      return 'blue';
    }
    return 'green'
  }};
`;
