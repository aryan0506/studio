import {createContext} from 'react';

export const CareerContext = createContext({
  careers: [],
  setCareers: (careers: any) => {
  },
});
