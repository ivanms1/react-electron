import { Button, Flex, Text } from '@chakra-ui/react';
import React, { useState } from 'react';

import { useAppState } from '../../components/AppContext';
import Todo from '../../components/Todo';
import TodoModal from '../../components/TodoModal';

function Home() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { todos } = useAppState();
  return (
    <div>
      <Text fontSize="5xl" mb={5}>
        Todo App
      </Text>
      <Button
        colorScheme="blue"
        mb={10}
        onClick={() => setIsCreateModalOpen(true)}
      >
        Add New Todo
      </Button>
      <Flex flexDirection="column">
        {todos.map((todo) => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </Flex>
      <TodoModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}

export default Home;
