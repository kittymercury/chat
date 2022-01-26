import styled from 'styled-components';
import { Block, Form } from 'react-bulma-components';

export const StyledLi = styled.li`
  margin-bottom: 15px;
  height: fit-content;
  background: none !important;
  list-style: none;
  font: 14px/22px "Lato", Arial, sans-serif;
  position: relative;
  flex-direction: column;
  align-items: ${props => (props.user === 'me') ? 'flex-end' : 'flex-start'};
  background-color: ${props => (props.selected) ? '#3e846321' : 'none'} !important;

  .block {
    color: white;
    display: inline-block;
    line-height: 26px;
    border-radius: 25px;
    cursor: pointer;
    position: relative;
    max-width: 350px;
    padding: 10px 20px;
    background-color: ${props => (props.user === 'me')
      ? props.theme === 'dark' ? '#383942' : '#5a3668'
      : props.theme === 'dark' ? '#525252' : '#653776'
    };

    .message-data {
      display: block;

      .message-data-content {
        display: inline-block;
        text-align: left;
        font-size: 1.15rem;
        transition-duration: 2s;
        white-space: pre-wrap;
        word-break: break-word;
      }

      .data-wrapper {
        display: inline-block;
        float: right;
        white-space: nowrap;
        color: #d9d4d4;

        .edited {
          font-size: 0.8rem;
          margin: 0 5px;
          color: #c5c5c5;
        }

        .message-data-time {
          font-size: 0.9rem;
          display: inline-block;
        }

        .seen i {
          margin-left: 5px;
          font-size: 1rem;
          color: #ffffffa3;
        }
      }
    }

    .message-forward {
      flex-direction: row-reverse;

      .forwarded-from {
        font-size: 0.8rem;

        span:first-child {
          color: #b3b3b3;
        }

        span:nth-child(2) {
          margin-left: 5px;
        }
      }

      .forwarded-text {
        font-size: 1.15rem;
      }
    }

    .message-reply {
      text-align: left;

      .reply-wrapper {
        padding: 0 0 0.5rem 0.5rem;
        border-left: 2px solid gray;
        max-width: 200px;

        .to-user {
          font-size: 0.8rem;

          span:first-child {
            color: #b3b3b3;
          }


        }

        .text-for-replying {
          line-height: 1.2rem;
          word-wrap: break-word;
          overflow: hidden;
          /* max-width: 100%; */
          /* max-height: 40px; */
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
    }
  }
`;
