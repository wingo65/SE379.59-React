import React, { createContext, useState, ReactNode, useContext } from 'react';

//Define Inventory context
interface InventoryContextType {
  inventory: string[]; 
  toggleInventory: (name: string) => void; 
}

//New context for inventory
const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

//Define the provider component
export const InventoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  //State to manage the list of Pokemon
  const [inventory, setInventory] = useState<string[]>([]); 

  //Function to toggle Pokemon in inventory
  const toggleInventory = (name: string) => {
    setInventory(prevInventory => 
      prevInventory.includes(name)
        ? prevInventory.filter(item => item !== name) // Remove from inventory
        : [...prevInventory, name] // Add to inventory
    );
  };

  //Provide context value to children
  return (
    <InventoryContext.Provider value={{ inventory, toggleInventory }}>
      {children}
    </InventoryContext.Provider>
  );
};

//Hook to access inventory context
export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};
