import { Categoria } from './categoria';
import { Proveedor } from './proveedor';

export interface Producto {
  id: number;
  nombreProducto: string;
  descripcionProducto: string;
  cantidadEnExistencia: number;
  precio: number;
  categoria: Categoria;
  proveedor: Proveedor;
}
