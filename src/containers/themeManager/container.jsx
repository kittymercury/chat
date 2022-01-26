import styled from 'styled-components';
// import * as initialState from './reducers/initialState';

const themeProp = attr => ({ theme }) => theme[attr];

export default styled.div`
  //-----------------------------------------
  // Globals
  //-----------------------------------------

  &.theme-manager {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    background-color: ${themeProp('mainBackground')} !important;
    color: ${themeProp('mainTextColor')};

    display: flex;
    flex-direction: column;
  }

  li {
    background-color: ${themeProp('wrapperBackground')};
  }

  .title, .subtitle, label, .label {
    color: ${themeProp('mainTextColor')};
  }

  .user-status {
    color: ${themeProp('grayTextColor')};
  }

  i.fas.fa-circle {
    &.online {
      color: ${themeProp('onlineCircleColor')};
    }

    &.offline {
      color: ${themeProp('offlineCircleColor')};

    }
  }

  //-----------------------------------------
  // Navbars
  //-----------------------------------------

  nav.navbar {
    background: ${themeProp('mainBackground')};

    &.header .navbar-item {
      color: ${themeProp('mainTextColor')};

        &:hover {
          color: inherit;
        }
    }
  }

  .navbar.footer {
    .navbar-item {
      color: ${themeProp('footerIconColor')};

      &.is-active {
        color: ${themeProp('activeFooterIconColor')};
      }
    }
  }

  .navbar-item .dropdown.navbar-dropdown {
    .dropdown-trigger > button.button {
      background: ${themeProp('mainBackground')};
      color: ${themeProp('mainTextColor')};

      &:focus-within {
        background: ${themeProp('mainBackground')};
      }
    }

    .dropdown-menu .dropdown-content {
      background-color: ${themeProp('navbarDropdownMenuBackground')} !important;
      box-shadow: ${themeProp('navbarDropdownMenuBoxShadow')} !important;

      .dropdown-item {
        box-shadow: ${themeProp('navbarDropdownItemBoxShadow')} !important;
      }
    }
  }

  //-----------------------------------------
  // Components
  //-----------------------------------------


  // Chats

  .container.chats ul li .chat-data {
    .name {
      color: ${themeProp('mainTextColor')};

      .number-of-unseen-msgs {
        color: ${themeProp('buttonsBrightColor')};
      }

      .time {
        color: ${themeProp('grayTextColor')};
      }
    }
  }

// Contacts

  .container.contacts li .user-name {
    span {
      color: ${themeProp('mainTextColor')};
    }

    .user-status {
      color: ${themeProp('grayTextColor')};
    }
  }

  // Settings

  .container.settings .section {
    background-color: ${themeProp('wrapperBackground')};

    .name {
      color: ${themeProp('mainTextColor')};
    }

    .login {
      color: ${themeProp('grayTextColor')};
    }
  }

  .settings .settings-dropdowns .dropdown {
    .dropdown-trigger {
      background-color: ${themeProp('dropdownTriggerSettings')} !important;

      .button {
        color: ${themeProp('mainTextColor')};
      }
    }

    &.is-active {
      .dropdown-trigger {
        background-color: ${themeProp('activeDropdownTriggerSettings')};
      }
    }

    .dropdown-menu {
      background-color: ${themeProp('mainBackground')};

      .dropdown-content {
        background: ${themeProp('wrapperBackground')};

        .dropdown-item {
          color: ${themeProp('mainTextColor')};
        }

        .dropdown-divider {
          background: ${themeProp('mainBackground')};
        }
      }
    }
  }

  // Contact-info

  .container.contact-info {
    section.section:first-child {
      background: ${themeProp('wrapperBackground')};
    }

    section.section:nth-child(2) {
      button {
        background: ${themeProp('wrapperBackground')};
      }
    }
  }

  .container.messages {
    li div.buttons.has-addons {
      button {
        background: ${themeProp('buttonsBrightColor')};
      }
    }

    .buttons.options-selected-messages {
      button.button {
        background: ${themeProp('buttonsBrightColor')};
        color: ${themeProp('mainTextColor')};
      }
    }

    .input-fixed {
      button.input-button {
        background: ${themeProp('inputButtonBackground')}
        color: ${themeProp('mainTextColor')};
      }

      .card.input-reply {
        color: ${themeProp('mainTextColor')};

        i.fas.fa-reply {
          color: ${themeProp('buttonsBrightColor')};
        }

        i.fas.fa-times {
          color: red;
        }
      }
    }
  }
`;
