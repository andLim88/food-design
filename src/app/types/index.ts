export interface Restaurant {
    id: string;
    name: string;
    price: number;
    location: string;
    rating: number;
    reviews: number;
    image: string;
  }
  
  export interface OrderItem {
    id: string;
    name: string;
    quantity: number;
    price: number;
    image: string; 
  }
  
  export interface User {
    name: string;
    address: string;
    payment: {
      lastFour: string;
      expiry: string;
    };
  }
  
  export interface CategoryButton {
    id: string;
    label: string;
    icon?: JSX.Element;
  }