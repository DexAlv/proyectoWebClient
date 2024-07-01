import { Component } from '@angular/core';
import { Producto } from '../../../interfaces/producto';
import { ProductoService } from '../../../services/producto/producto.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { CategoriaService } from '../../../services/categoria/categoria.service';
import { ProveedorService } from '../../../services/proveedor/proveedor.service';
import { Categoria } from '../../../interfaces/categoria';
import { Proveedor } from '../../../interfaces/proveedor';

@Component({
  selector: 'app-producto-list',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './producto-list.component.html',
  styleUrl: './producto-list.component.css',
})
export class ProductoListComponent {
  productosMap: Map<number, Producto> = new Map<number, Producto>();
  productoSchema: Producto = {
    id: 0,
    nombreProducto: '',
    descripcionProducto: '',
    cantidadEnExistencia: 0,
    precio: 0,
    categoria: {
      id: 0,
      nombreCategoria: '',
      descripcionCategoria: '',
    },
    proveedor: {
      id: 0,
      nombreProveedor: '',
      numeroTelefono: '',
      email: '',
    },
  };

  categorias: Categoria[] = [];
  proveedores: Proveedor[] = [];

  constructor(
    private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private proveedorService: ProveedorService
  ) {}

  ngOnInit() {
    this.productoService.getProductos().subscribe((res) => {
      for (const val of res) {
        this.productosMap.set(val.id, val);
      }
      this.categoriaService
        .getCategorias()
        .subscribe((res) => (this.categorias = res));
      this.proveedorService
        .getProveedores()
        .subscribe((res) => (this.proveedores = res));
    });
  }

  getProducto(id: number) {
    const producto = this.productosMap.get(id);
    if (producto) {
      this.productoSchema = producto;
    }
  }

  postProducto() {
    this.productoService
      .postCliente(this.productoSchema)
      .subscribe((res) => location.reload());
  }

  putProducto() {
    this.productoService
      .putProducto(this.productoSchema.id, this.productoSchema)
      .subscribe((res) =>
        Swal.fire(
          'Actualizado',
          'Tabla ' +
            this.productosMap.get(this.productoSchema.id)?.nombreProducto +
            ' actualizada con éxito',
          'success'
        ).then((res) => location.reload())
      );
  }

  deleteProducto(id: number) {
    Swal.fire({
      title: '¿Seguro?',
      text: '¿Seguro que deseas eliminar? No podrás revertir esta acción',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      icon: 'warning',
    }).then((result) => {
      if (result.value) {
        this.productoService.deleteProducto(id).subscribe((res) => {
          Swal.fire(
            'Eliminado',
            'Tabla ' + this.productosMap.get(id)?.nombreProducto + ' eliminada',
            'success'
          ).then((res) => location.reload());
        });
      }
    });
  }
}
