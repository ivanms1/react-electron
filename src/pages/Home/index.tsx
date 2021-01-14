import React, { useState } from 'react';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';

import Todo from '../../components/Todo';
import TodoModal from '../../components/TodoModal';
import LogoutButton from '../../components/LogoutButton';

import { useAppState } from '../../components/AppContext';

function Home() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { todos } = useAppState();

  return (
    <Box>
      <Text align="center" fontSize="5xl" mb="50px">
        Todo App
      </Text>
      <LogoutButton />
      <Button
        colorScheme="blue"
        borderRadius="50%"
        height="100px"
        width="100px"
        onClick={() => setIsCreateModalOpen(true)}
        position="absolute"
        textTransform="uppercase"
        bottom="2%"
        right="2%"
      >
        Add Todo
      </Button>
      <Flex
        flexDirection="column"
        minWidth={400}
        maxHeight="500px"
        overflowY="auto"
      >
        {!todos.length && (
          <Text align="center" fontStyle="italic">
            Please add todos
          </Text>
        )}
        <AnimatePresence>
          {todos.length &&
            todos.map((todo) => <Todo key={todo.id} todo={todo} />)}
        </AnimatePresence>
      </Flex>
      <TodoModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </Box>
  );
}

export default Home;
