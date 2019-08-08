import * as React from 'react';

export const MyContext = React.createContext({});

export const ContextProvider = MyContext.Provider;

export const Consumer = MyContext.Consumer;
