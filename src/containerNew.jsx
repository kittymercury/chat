import styled from 'styled-components';

const themeProp = attr => ({ theme }) => theme[attr];

export default styled.div`

  //-----------------------------------------
  // Globals
  //-----------------------------------------
  width: 100%;
  height: 100%;
  background-color: ${themeProp('mainBackground')};
  color: ${themeProp('mainTextColor')};

  li {
    background-color: ${themeProp('wrapperBackground')};
  }

  .fas.fa-circle.online {
    color: ${themeProp('onlineCircleColor')};
  }

  .fas.fa-circle.offline {
    color: ${themeProp('offlineCircleColor')};
  }

  //-----------------------------------------
  // Components
  //-----------------------------------------

  // Login

  .container.login-page {
    .title, .subtitle, label, .label {
      color: ${themeProp('mainTextColor')};
    }
  }

  // Chats

  .container.chats {
    .number-of-unseen-msgs {
      color: ${themeProp('buttonsBrightColor')};
    }
  }

// Contacts

  .container.contacts {
    li .user-status {
      color: ${themeProp('grayTextColor')};
    }
  }

  // Settings

  .container.settings .section {
    background-color: ${themeProp('wrapperBackground')};

    .block.menu-name {
      color: ${themeProp('mainTextColor')};
    }

    .block .name {
      color: ${themeProp('mainTextColor')};
    }

    .login {
      color: ${themeProp('grayTextColor')};
    }
  }

  .settings-dropdowns .dropdown.is-active .dropdown-trigger {
    background-color: ${themeProp('activeDropdownTriggerSettings')};
  }

  .settings-dropdowns .dropdown .dropdown-trigger {
    background: ${themeProp('dropdownTriggerSettings')};

    .button {
      border: none;
      color: ${themeProp('mainTextColor')};;

      &:focus:not(:active) {
        box-shadow: none;
      }
    }
  }

  .dropdown-menu {
    background-color: ${themeProp('mainBackground')};

    .dropdown-content {
      background: ${themeProp('wrapperBackground')};

      .dropdown-divider {
        background: ${themeProp('mainBackground')};
      }
    }
  }

  // -------------
`;
