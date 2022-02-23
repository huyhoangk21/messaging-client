import React from 'react';

type TextAreaContextType = {
  textAreaRef: React.RefObject<HTMLTextAreaElement>;
  text: string;
  textAreaHeight: string;
  textAreaContainerHeight: string;
  updateTextArea: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  resetTextArea: () => void;
  trimTextArea: () => void;
};

const TextAreaContext = React.createContext<TextAreaContextType>(null!);

export const TextAreaProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);
  const [text, setText] = React.useState<string>('');
  const [textAreaHeight, setTextAreaHeight] = React.useState<string>('51px');
  const [textAreaContainerHeight, setTextAreaContainerHeight] =
    React.useState<string>('51px');

  React.useEffect(() => {
    if (textAreaRef.current) {
      setTextAreaContainerHeight(`${textAreaRef.current!.scrollHeight}px`);
      setTextAreaHeight(`${textAreaRef.current!.scrollHeight}px`);
    }
  }, [text]);

  const resetTextArea = () => {
    setTextAreaHeight('auto');
    setTextAreaContainerHeight(`${textAreaRef.current!.scrollHeight}px`);
    setText('');
  };

  const updateTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaHeight('auto');
    setTextAreaContainerHeight(`${textAreaRef.current!.scrollHeight}px`);
    setText(e.target.value);
  };

  const trimTextArea = () => {
    setText(text.trim());
  };

  const value = {
    textAreaRef,
    text,
    textAreaHeight,
    textAreaContainerHeight,
    updateTextArea,
    trimTextArea,
    resetTextArea,
  };

  return (
    <TextAreaContext.Provider value={value}>
      {children}
    </TextAreaContext.Provider>
  );
};

export const useTextArea = () => React.useContext(TextAreaContext);
