// 'use client';
// import MenuPanel from '@/components/toGoMenu/MenuPanel';
// import styles from './challenge2.module.css';
// import CartPanel from '@/components/toGoMenu/CartPanel';
// import PricePanel from '@/components/toGoMenu/PricePanel';
// import menuItems from '@/lib/menuItems';
// import { useState } from 'react';

// export default function ToGoMenuPage() {
//   const [cartItems, setCartItems] = useState([]);

//   const addToCart = (item) => {
//     //Megkeresi, hogy az elem már szerepel-e a kosárban:
//     const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
//     //Ha az elem már szerepel a kosárban a count értékét növeli 1-gyel
//     if (existingItem) {
//       setCartItems(
//         cartItems.map((cartItem) =>
//           cartItem.id === item.id
//             ? { ...cartItem, count: cartItem.count + 1 }
//             : cartItem
//         )
//       );
//     } else {
//       setCartItems([...cartItems, { ...item, count: 1 }]);
//     }
//   };

//   const increaseQuantity = (itemId) => {
//     setCartItems(
//       cartItems.map((cartItem) =>
//         cartItem.id === itemId
//           ? { ...cartItem, count: cartItem.count + 1 }
//           : cartItem
//       )
//     );
//   };

//   const decreaseQuantity = (itemId) => {
//     setCartItems(
//       cartItems
//         .map((cartItem) =>
//           cartItem.id === itemId
//             ? { ...cartItem, count: cartItem.count - 1 }
//             : cartItem
//         )
//         .filter((cartItem) => cartItem.count > 0)
//     );
//   };

//   return (
//     <div className={styles.container}>
//       <div className={`${styles.wrapper} ${styles.menu}`}>
//         <MenuPanel
//           menuItems={menuItems}
//           addToCart={addToCart}
//           cartItems={cartItems}
//         />
//         <div className={`${styles.panel} ${styles.cart}`}>
//           <CartPanel
//             cartItems={cartItems}
//             increaseQuantity={increaseQuantity}
//             decreaseQuantity={decreaseQuantity}
//           />
//           <PricePanel cartItems={cartItems} />
//         </div>
//       </div>
//     </div>
//   );
// }

'use client';
import { useReducer } from 'react';
import MenuPanel from '@/components/toGoMenu/MenuPanel';
import CartPanel from '@/components/toGoMenu/CartPanel';
import PricePanel from '@/components/toGoMenu/PricePanel';
import menuItems from '@/lib/menuItems';
import styles from './challenge2.module.css';

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      // Ellenőrizzük, hogy az elem már szerepel-e a kosárban
      const existingItem = state.find((item) => item.id === action.payload.id);
      if (existingItem) {
        // Ha szerepel, akkor növeljük a mennyiségét
        return state.map((item) =>
          item.id === action.payload.id
            ? { ...item, count: item.count + 1 }
            : item
        );
      }
      // Ha nem szerepel, akkor hozzáadjuk az új elemet a kosárhoz
      return [...state, { ...action.payload, count: 1 }];

    case 'INCREASE_QUANTITY':
      // Megnöveljük a megadott elem mennyiségét
      return state.map((item) =>
        item.id === action.payload ? { ...item, count: item.count + 1 } : item
      );

    case 'DECREASE_QUANTITY':
      // Csökkentjük a megadott elem mennyiségét, és eltávolítjuk, ha 0 lesz
      return state
        .map((item) =>
          item.id === action.payload ? { ...item, count: item.count - 1 } : item
        )
        .filter((item) => item.count > 0); // Szűrjük ki a 0 mennyiségű elemeket

    default:
      // Ha az akció típusa nem ismert, visszaadjuk az aktuális állapotot
      return state;
  }
};
export default function ToGoMenuPage() {
  const [cartItems, dispatch] = useReducer(cartReducer, []);

  return (
    <div className={styles.container}>
      <div className={`${styles.wrapper} ${styles.menu}`}>
        <MenuPanel
          menuItems={menuItems}
          addToCart={(item) => dispatch({ type: 'ADD_ITEM', payload: item })}
          cartItems={cartItems}
        />
        <div className={`${styles.panel} ${styles.cart}`}>
          <CartPanel
            cartItems={cartItems}
            increaseQuantity={(id) =>
              dispatch({ type: 'INCREASE_QUANTITY', payload: id })
            }
            decreaseQuantity={(id) =>
              dispatch({ type: 'DECREASE_QUANTITY', payload: id })
            }
          />
          <PricePanel cartItems={cartItems} />
        </div>
      </div>
    </div>
  );
}
