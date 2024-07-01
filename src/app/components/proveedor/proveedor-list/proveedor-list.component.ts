import { Component } from '@angular/core';
import { Proveedor } from '../../../interfaces/proveedor';
import { ProveedorService } from '../../../services/proveedor/proveedor.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-proveedor-list',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './proveedor-list.component.html',
  styleUrl: './proveedor-list.component.css',
})
export class ProveedorListComponent {
  proveedoresMap: Map<number, Proveedor> = new Map<number, Proveedor>();
  proveedorId: number = 0;
  nombreProveedor: string = '';
  numeroTelefono: string = '';
  email: string = '';

  constructor(private proveedorService: ProveedorService) {}

  ngOnInit() {
    this.proveedorService.getProveedores().subscribe((res) => {
      for (const val of res) {
        this.proveedoresMap.set(val.id, val);
      }
    });
  }

  getProveedor(id: number) {
    const proveedor = this.proveedoresMap.get(id);
    this.proveedorId = id;
    if (proveedor) {
      this.nombreProveedor = proveedor.nombreProveedor;
      this.numeroTelefono = proveedor.numeroTelefono;
      this.email = proveedor.email;
    }
  }

  postProveedor() {
    const proveedorSchema = {
      id: 0,
      nombreProveedor: this.nombreProveedor,
      numeroTelefono: this.numeroTelefono,
      email: this.email,
    };

    this.proveedorService
      .postProveedor(proveedorSchema)
      .subscribe((res) => location.reload());
  }

  putProveedor() {
    const proveedorSchema = {
      id: 0,
      nombreProveedor: this.nombreProveedor,
      numeroTelefono: this.numeroTelefono,
      email: this.email,
    };

    this.proveedorService
      .putProveedor(this.proveedorId, proveedorSchema)
      .subscribe((res) =>
        Swal.fire(
          'Actualizado',
          'Tabla ' +
            this.proveedoresMap.get(this.proveedorId)?.nombreProveedor +
            ' actualizada con éxito',
          'success'
        ).then((res) => location.reload())
      );
  }

  deleteProveedor(id: number) {
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
        this.proveedorService.deleteProveedor(id).subscribe((res) => {
          Swal.fire(
            'Eliminado',
            'Tabla ' +
              this.proveedoresMap.get(id)?.nombreProveedor +
              ' eliminada',
            'success'
          ).then((res) => location.reload());
        });
      }
    });
  }
}
