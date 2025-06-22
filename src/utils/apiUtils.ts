interface ApiResponse<T> extends Response {
  json(): Promise<T>;
}

interface ApiError {
  message: string;
  status: number;
}

export const checkResponse = <T>(res: ApiResponse<T>): Promise<T> => {
  if (res.ok) {
    return res.json();
  }
  throw {
    message: `Ошибка ${res.status}`,
    status: res.status
  } as ApiError;
};

export async function apiRequest<T>(url: string, options: RequestInit): Promise<T> {
  try {
    const response = await fetch(url, options);
    return checkResponse<T>(response);
  } catch (error) {
    throw error as ApiError;
  }
} 