import React, { useState } from 'react';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

import { useAppState } from '../../components/AppContext';
import Todo from '../../components/Todo';
import TodoModal from '../../components/TodoModal';

function Home() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { todos } = useAppState();
  return (
    <Box>
      <Text align="center" fontSize="5xl" mb="50px">
        Todo App
      </Text>
      <Button
        leftIcon={<AddIcon />}
        colorScheme="blue"
        borderRadius="50%"
        height="120px"
        width="120px"
        onClick={() => setIsCreateModalOpen(true)}
        position="absolute"
        bottom="2%"
        right="2%"
      >
        Add Todo
      </Button>
      <Flex flexDirection="column" minWidth={400} overflowY="auto">
        {todos.length ? (
          todos.map((todo) => <Todo key={todo.id} todo={todo} />)
        ) : (
          <Text align="center" fontStyle="italic">
            Please add todos
          </Text>
        )}
      </Flex>
      <TodoModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </Box>
  );
}

export default Home;
