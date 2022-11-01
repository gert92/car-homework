export type Car = {
  data: {
    id: number;
    attributes: {
      brand: string;
      model: string;
      year: string;
      imageUrl?: string;
      price: number;
      details: {
        gearbox: string;
        motor: string;
        drivetrain: string;
      };
    };
  };
  id: number;
  attributes: {
    brand: string;
    model: string;
    year: string;
    imageUrl?: string;
    price: number;
    details: {
      gearbox: string;
      motor: string;
      drivetrain: string;
    };
  };
};

export type User = {
  id?: number;
  jwt?: string;
  username?: string;
  password?: string;
  email?: string;
  provider?: string;
  role?: {
    type?: string;
  };
  balance?: string;
  createdAt?: string;
  cars?: number[];
  // loggedIn?: boolean;
};

export type Login = {
  identifier: string;
  password: string;
};

export type Alert = {
  msg: string;
  type: string;
};
