import { ChangeEvent } from 'react';


export interface FilterComponentIterface {
  value: string;
  handleFiltering: () => void;
  onInputChange: (e: ChangeEvent<any>) => void;
}