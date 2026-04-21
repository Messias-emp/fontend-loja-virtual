/**
 * Modelo que representa a resposta padrão da API
 * Mantém o front desacoplado e previsível
 */
export interface AuthResponse {
  success: boolean;
  message?: string;   // ← mensagem opcional vinda do backend
  data?: {
    token: string;
    role?: string;
  };
}
