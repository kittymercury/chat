import styled from 'styled-components';
import { Block, Form } from 'react-bulma-components';

export const StyledInput = styled(Form.Input)`
  color: white;
  display: inline-block;
  line-height: 26px;
  border-radius: 25px;
  cursor: pointer;
  position: relative;
  max-width: 350px;
  padding: ${props => props.user === 'me' ? '10px 10px 10px 20px' : '10px 20px'};
  background-color: ${props => props.user === 'me' ? '#383942' : '#525252'};
`;

export const StyledLi = styled.li`
  margin: 15px;
  background: none;
  list-style: none;
  font: 14px/22px "Lato", Arial, sans-serif;
  position: relative;
  text-align: ${props => (props.user === 'me') ? 'right' : 'left'};
  flex-direction: ${props => (props.user === 'me') ? 'row-reverse' : 'row'};

  .block {
    color: white;
    display: inline-block;
    line-height: 26px;
    border-radius: 25px;
    cursor: pointer;
    position: relative;
    max-width: 350px;
    padding: ${props => (props.user === 'me') ? '10px 10px 10px 20px' : '10px 20px'};
    background-color: ${props => (props.user === 'me') ? '#383942' : '#525252'};
    }
  }
`;
