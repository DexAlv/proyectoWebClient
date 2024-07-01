import { Producto } from "./producto";

export interface Vendedor {
    id: number,
    nombreEmpleado: string;
    numeroEmpleado: string;
    totalVendido: number,
    sueldo: number,
    producto_id: Producto
}
