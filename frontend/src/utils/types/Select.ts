import { ReactNode } from 'react';

export type SelectItem = {
  name: string;
  logo?: ReactNode;
};

export type SelectItemList = SelectItem[];
