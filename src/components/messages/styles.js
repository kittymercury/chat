import styled from 'styled-components';
import { Block, Form } from 'react-bulma-components';

// const myMessageBg = `background-color: #383942;`;
// const otherMessageBg = `background-color: #525252;`;
// const baseTextColor = `color: #fff;`;

// export const StyledSelect = styled.div`
//   float: ${props => props.author === 'me' ? 'left' : 'right'};
// `;
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

export const StyledCloud = styled(Block)`
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
  text-align: ${props => props.mine ? 'right' : 'left'};
  flex-direction: ${props => props.mine ? 'row-reverse' : 'row'};
`;

//   <StyledLi key={message.id} author={message.user === currentUser.id ? 'me' : 'other'} id={`m-${message.id}`}>
//     {isSelectMode && (message.user === currentUser.id) && (
//       <div className="select">
//         <i className="far fa-circle"></i>
//         <i className="fas fa-circle"></i>
//       </div>
//     )}
//
//       <StyledCloud onClick={() => this.handleClickMessage(message.id)}>
//         {this.renderMessageReply(users, message)}
//         {this.renderMessageForward(users, message)}
//         <div className="message-data">
//           <div className={className} dangerouslySetInnerHTML={this.tryHighlight(message.content)} />
//           <div className="data-wrapper">
//             <span className="edited">{message.edited ? 'Edited' : ''}</span>
//             <span className="message-data-time">{formatDate(message.created_at)}</span>
//             {this.renderSeenCheck(true)}
//           </div>
//         </div>
//       </StyledCloud>
//     )}
//
//     {(message.user !== currentUser.id) && (
//       <div className="other-message" style={textALign, flexDirection} onClick={() => this.handleClickMessage(message.id)}>
//         {this.renderMessageReply(users, message)}
//         {this.renderMessageForward(users, message)}
//         <div className="message-data">
//           <div className={className} dangerouslySetInnerHTML={this.tryHighlight(message.content)} />
//           <div className="data-wrapper">
//             <span className="edited">{message.edited ? 'Edited' : ''}</span>
//             <span className="message-data-time">{formatDate(message.created_at)}</span>
//           </div>
//         </div>
//       </div>
//     )}
//     {isSelectMode && (message.user !== currentUser.id) && (
//       <div className="select">
//         <i className="far fa-circle"></i>
//         <i className="fas fa-circle"></i>
//       </div>
//       )}
//
//     {(message.id === messageWithFeatures) &&
//     this.renderEditMessageFeatures()}
//   </StyledLi>
// )
// })}
