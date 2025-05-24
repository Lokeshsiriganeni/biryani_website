import React, { createContext, useState } from "react";

// Create a context for the menu items
export const MenuContext = createContext();

// Create a provider component
export const MenuProvider = ({ children }) => {
  const [menuItems] = useState([
    {
      id: 1,
      name: "Chicken Biryani",
      imageUrl:
        "https://res.cloudinary.com/dx1qxaknp/image/upload/v1740251762/ysnu4ddxfquazzonclan.jpg",
      description:
        "Aromatic basmati rice cooked with tender chicken pieces and a blend of spices.",
      price: 160,
    },
    {
      id: 2,
      name: "Chicken Boneless 65 Biryani",
      imageUrl:
        "https://res.cloudinary.com/dx1qxaknp/image/upload/v1740252198/special-dum-birayani_ucjlmg.jpg",
      description: "Spicy boneless chicken biryani with a tangy twist.",
      price: 150,
    },
    {
      id: 3,
      name: "Chicken Boneless Spicy Biryani",
      imageUrl:
        "https://res.cloudinary.com/dx1qxaknp/image/upload/v1740251762/ysnu4ddxfquazzonclan.jpg",
      description: "Extra spicy boneless chicken biryani for heat lovers.",
      price: 260,
    },
    {
      id: 4,
      name: "Chicken Boneless Golden Biryani",
      imageUrl:
        "https://res.cloudinary.com/dx1qxaknp/image/upload/v1740251762/ysnu4ddxfquazzonclan.jpg",
      description: "Golden fried boneless chicken biryani with a rich flavor.",
      price: 250,
    },
    {
      id: 5,
      name: "Chicken Boneless Pepper Biryani",
      imageUrl:
        "https://res.cloudinary.com/dx1qxaknp/image/upload/v1740251762/ysnu4ddxfquazzonclan.jpg",
      description: "Pepper-infused boneless chicken biryani for a bold taste.",
      price: 400,
    },
    {
      id: 6,
      name: "Mutton Biryani (Weekend)",
      imageUrl:
        "https://res.cloudinary.com/dx1qxaknp/image/upload/v1740251762/ysnu4ddxfquazzonclan.jpg",
      description: "Slow-cooked mutton biryani available only on weekends.",
      price: 260,
    },
    {
      id: 7,
      name: "DC Hyd Special Biryani (Weekend)",
      imageUrl:
        "https://res.cloudinary.com/dx1qxaknp/image/upload/v1740251762/ysnu4ddxfquazzonclan.jpg",
      description:
        "Hyderabadi-style biryani with a special touch, available on weekends.",
      price: 160,
    },
  ]);

  return (
    <MenuContext.Provider value={{ menuItems }}>
      {children}
    </MenuContext.Provider>
  );
};
