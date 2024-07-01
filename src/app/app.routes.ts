import { Routes } from '@angular/router';
import { CategoriaListComponent } from './components/categoria/categoria-list/categoria-list.component';
import { ClienteListComponent } from './components/cliente/cliente-list/cliente-list.component';
import { ProductoListComponent } from './components/producto/producto-list/producto-list.component';
import { ProveedorListComponent } from './components/proveedor/proveedor-list/proveedor-list.component';
import { VendedorListComponent } from './components/vendedor/vendedor-list/vendedor-list.component';

export const routes: Routes = [
  { path: 'categorias', component: CategoriaListComponent },
  { path: 'clientes', component: ClienteListComponent },
  { path: 'productos', component: ProductoListComponent },
  { path: 'proveedores', component: ProveedorListComponent },
  { path: 'vendedores', component: VendedorListComponent },
];
