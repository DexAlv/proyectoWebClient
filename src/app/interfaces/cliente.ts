import { Vendedor } from './vendedor';

export interface Cliente {
  id: number;
  nombreCliente: string;
  direccion: string;
  telefono: string;
  email: string;
  vendedor_id: Vendedor;
}
