import React, { useState } from 'react';
import { Button, Flex } from '@chakra-ui/react';
import { motion } from 'framer-motion';

import { useAppDispatch } from '../AppContext';

import TodoModal from '../TodoModal';

const MotionFlex = motion.custom(Flex);

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
    <MotionFlex
      justifyContent="space-between"
      initial={{ x: -200, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ ease: 'easeOut', duration: 0.5 }}
      exit={{ x: -400, opacity: 0 }}
      overflow="visible"
    >
      <Button
        display="block"
        size="sm"
        variant="outline"
        mr={1}
        mb={2}
        onClick={() => setIsModalOpen(true)}
        textOverflow="ellipsis"
        paddingLeft="10px"
        paddingRight="10px"
        overflow="hidden"
        whiteSpace="nowrap"
        width={360}
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
    </MotionFlex>
  );
}

export default Todo;
