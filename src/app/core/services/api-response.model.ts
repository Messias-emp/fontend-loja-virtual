/**
 * Modelo genérico que representa o contrato da API.
 * Espelha exatamente o ApiResponse<T> do backend.
 */
export interface ApiResponse<T> {
  data: T;
  message: string;
  timestamp: string;
}
