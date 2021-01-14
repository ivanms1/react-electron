import React from 'react';
import { remote } from 'electron';
import { Button } from '@chakra-ui/react';

const authService = remote.require('./services/auth-service');

function LogoutButton() {
  return (
    <Button
      colorScheme="red"
      onClick={() => {
        authService.createLogoutWindow();
        remote.getCurrentWindow().close();
      }}
      position="absolute"
      textTransform="uppercase"
      top="2%"
      right="2%"
      size="sm"
    >
      Logout
    </Button>
  );
}

export default LogoutButton;
