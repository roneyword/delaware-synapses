"use client"
import { useState } from 'react';

export const useHeader = () => {
  const [titleHeader, setTitleHeader] = useState<string>('teste');

  const updateTitle = (newTitle: string) => {
    setTitleHeader(newTitle);
  };

  return { titleHeader, updateTitle };
};