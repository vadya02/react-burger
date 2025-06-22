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