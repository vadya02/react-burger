export interface OrderRequest {
  ingredients: string[];
}

export interface OrderResponse {
  success: boolean;
  name: string;
  order: {
    number: number;
  };
}

export interface OrderState {
  number: number | null;
  loading: boolean;
  error: string | null;
}

export interface Order {
  _id: string;
  ingredients: string[];
  status: 'done' | 'pending' | 'created' | 'canceled' | string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
} 