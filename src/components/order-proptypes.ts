export type TOrder = {
    ingredients: string[];
    _id: string;
    status: 'created' | 'pending' | 'done';
    number: number;
    name: string;
    createdAt: string;
    updatedAt: string;
};

export type TWsData = {
    orders: TOrder[];
    total: number;
    totalToday: number;
};