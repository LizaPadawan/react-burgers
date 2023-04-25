export type TOrder = {
    ingredients: string[];
    _id: string;
    status: 'created' | 'pending' | 'done';
    number: number;
    name: string;
    createdAt: string;
    updatedAt: string;
};

export type TOrders = {
    data: {
        orders: TOrder[];
        total: number;
        totalToday: number;
    }
}

export type TWsData = {
    orders: TOrder[];
    total: number;
    totalToday: number;
};

export type TUser = {
    user: {
        email: string;
        name: string;
      }
};

export type TInUser = {
    email: string;
    name: string;
};

 export type TForm = { 
    password?: string; 
    email?: string;
    name?: string,
    token? : string
 }