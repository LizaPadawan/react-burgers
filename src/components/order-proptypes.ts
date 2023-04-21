export type TOrder = {
    ingredients: string[];
    _id: string;
    status: 'created' | 'pending' | 'done';
    number: number;
    name: string;
    createdAt: string;
    updatedAt: string;
};