import React from 'react';

type DrawerContextType = {
  isDrawerOpen: boolean;
  toggleDrawer: (
    open: boolean
  ) => (e: React.KeyboardEvent | React.MouseEvent) => void;
};

const DrawerContext = React.createContext<DrawerContextType>(null!);

export const DrawerProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDrawerOpen, setDrawerOpen] = React.useState<boolean>(false);

  const toggleDrawer =
    (open: boolean) => (e: React.KeyboardEvent | React.MouseEvent) => {
      if (
        e.type === 'keydown' &&
        ((e as React.KeyboardEvent).key === 'Tab' ||
          (e as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setDrawerOpen(open);
    };

  const value = { isDrawerOpen, toggleDrawer };
  return (
    <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>
  );
};

export const useDrawer = () => React.useContext(DrawerContext);
