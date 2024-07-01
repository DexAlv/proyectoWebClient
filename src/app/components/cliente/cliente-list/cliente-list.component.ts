import { Component } from '@angular/core';
import { Cliente } from '../../../interfaces/cliente';
import { ClienteService } from '../../../services/cliente/cliente.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { Vendedor } from '../../../interfaces/vendedor';

@Component({
  selector: 'app-cliente-list',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cliente-list.component.html',
  styleUrl: './cliente-list.component.css',
})
export class ClienteListComponent {
  clientesMap: Map<number, Cliente> = new Map<number, Cliente>();
  cliente_id: number = 0;
  nombreCliente: string = '';
  direccion: string = '';
  telefono: string = '';
  email: string = '';
  vendedor_id: Vendedor | any;

  constructor(private clienteService: ClienteService) {}

  ngOnInit() {
    this.clienteService.getClientes().subscribe((res) => {
      for (const val of res) {
        this.clientesMap.set(val.id, val);
      }
    });
  }

  getCliente(id: number) {
    const cliente = this.clientesMap.get(id);
    this.cliente_id = id;
    if (cliente) {
      this.nombreCliente = cliente.nombreCliente;
      this.direccion = cliente.direccion;
      this.telefono = cliente.telefono;
      this.email = cliente.email;
      this.vendedor_id = cliente.vendedor_id;
    }
  }

  postCliente() {
    const clienteSchema = {
      id: 0,
      nombreCliente: this.nombreCliente,
      telefono: this.telefono,
      direccion: this.direccion,
      email: this.email,
      vendedor_id: this.vendedor_id,
    };

    this.clienteService
      .postCliente(clienteSchema)
      .subscribe((res) => location.reload());
  }

  putCliente() {
    const clienteSchema = {
      id: this.cliente_id,
      nombreCliente: this.nombreCliente,
      telefono: this.telefono,
      direccion: this.direccion,
      email: this.email,
      vendedor_id: this.vendedor_id,
    };

    this.clienteService
      .putCliente(this.cliente_id, clienteSchema)
      .subscribe((res) =>
        Swal.fire(
          'Actualizado',
          'Tabla ' +
            this.clientesMap.get(this.cliente_id)?.nombreCliente +
            ' actualizada con éxito',
          'success'
        ).then((res) => location.reload())
      );
  }

  deleteCliente(id: number) {
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
        this.clienteService.deleteCliente(id).subscribe((res) => {
          Swal.fire(
            'Eliminado',
            'Tabla ' + this.clientesMap.get(id)?.nombreCliente + ' eliminada',
            'success'
          ).then((res) => location.reload());
        });
      }
    });
  }
}
