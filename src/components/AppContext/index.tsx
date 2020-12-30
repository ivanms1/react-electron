import React, { createContext, ReactNode, useContext, useReducer } from 'react';

type Action =
  | { type: 'ADD_TODO'; payload: { title: string; id: string } }
  | { type: 'UPDATE_TODO'; payload: { title: string; id: string } }
  | { type: 'REMOVE_TODO'; payload: { id: string } }
  | { type: 'RESET_TODOS' };
type Dispatch = (action: Action) => void;
type State = { todos: { id: string; title: string }[] };
type AppProviderProps = { children: ReactNode };

const AppContext = createContext<State | undefined>(undefined);
const AppDispatchContext = createContext<Dispatch | undefined>(undefined);

function appReducer(state: State, action: Action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        todos: [...state.todos, action.payload],
      };

    case 'REMOVE_TODO':
      return {
        todos: state.todos.filter((t) => t.id !== action.payload.id),
      };

    case 'UPDATE_TODO': {
      const indexToUpdate = state.todos.findIndex(
        (t) => t.id === action.payload.id
      );

      state.todos[indexToUpdate] = action.payload;

      return { ...state };
    }

    case 'RESET_TODOS':
      return {
        todos: [],
      };

    default:
      return state;
  }
}

function AppProvider({ children }: AppProviderProps) {
  const [state, dispatch] = useReducer(appReducer, { todos: [] });

  return (
    <AppContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppContext.Provider>
  );
}

function useAppState() {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error('useAppState must be used within a AppProvider');
  }

  return context;
}

function useAppDispatch() {
  const context = useContext(AppDispatchContext);

  if (context === undefined) {
    throw new Error('useAppDispatch must be used within a AppProvider');
  }

  return context;
}

export { AppProvider, useAppState, useAppDispatch };
