import React, { useRef } from 'react';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import { useAppDispatch, useAppState } from '../AppContext';

const defaultProps = {
  todo: null,
};

type FormData = {
  title: string;
};

interface TodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  todo?: {
    id: string;
    title: string;
  };
}

function TodoModal({ todo, isOpen, onClose }: TodoModalProps) {
  const inputRef = useRef<any>();

  const { todos } = useAppState();
  const dispatch = useAppDispatch();

  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      title: todo?.title ?? '',
    },
  });

  const onSubmit = handleSubmit(({ title }) => {
    if (todo) {
      dispatch({
        type: 'UPDATE_TODO',
        payload: {
          id: todo.id,
          title,
        },
      });
    } else {
      dispatch({
        type: 'ADD_TODO',
        payload: {
          id: `${todos.length}-${title}`,
          title,
        },
      });
    }

    onClose();
  });

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      size="xs"
      initialFocusRef={inputRef}
    >
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{todo ? 'Update' : 'Create'} Todo</DrawerHeader>

          <DrawerBody>
            <form onSubmit={onSubmit} id="todo-form">
              <Input
                placeholder="Title"
                name="title"
                ref={(e) => {
                  register(e);
                  inputRef.current = e;
                }}
                required
              />
            </form>
          </DrawerBody>
          <DrawerFooter display="flex" justifyContent="space-between">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" colorScheme="blue" form="todo-form">
              {todo ? 'Update' : 'Create'}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
}

TodoModal.defaultProps = defaultProps;

export default TodoModal;
