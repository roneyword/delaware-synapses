import { useState } from 'react';

export const useHeader = () => {
  const [titleHeader, setTitleHeader] = useState<string>('');

  const updateTitle = (newTitle: string) => {
    setTitleHeader(newTitle);
  };

  return { titleHeader, updateTitle };
};