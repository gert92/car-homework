export type Car = {
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

  // data: {
  //   id: number;
  //   attributes: {
  //     brand: string;
  //     model: string;
  //     year: string;
  //     imageUrl?: string;
  //     price: number;
  //     details: {
  //       gearbox: string;
  //       motor: string;
  //       drivetrain: string;
  //     };
  //   };
  // };

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
  balance: number;
  createdAt?: string;
  cars?: Car[];
  // loggedIn?: boolean;
};

export type ApiResponse = {
  data: [];
  meta: {};
};

export type Login = {
  identifier: string;
  password: string;
};

export type Alert = {
  msg?: string;
  type?: string;
};
