import { Button, Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useAppDispatch } from '../AppContext';

import TodoModal from '../TodoModal';

interface TodoProps {
  todo: {
    id: string;
    title: string;
  };
}

function Todo({ todo }: TodoProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  return (
    <Flex justifyContent="space-between">
      <Button
        variant="outline"
        mr={1}
        mb={2}
        onClick={() => setIsModalOpen(true)}
      >
        {todo.title}
      </Button>
      <Button
        size="sm"
        colorScheme="red"
        onClick={() =>
          dispatch({
            type: 'REMOVE_TODO',
            payload: {
              id: todo?.id,
            },
          })
        }
      >
        x
      </Button>
      <TodoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        todo={todo}
      />
    </Flex>
  );
}

export default Todo;
