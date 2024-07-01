import { Component } from '@angular/core';
import { Categoria } from '../../../interfaces/categoria';
import { CategoriaService } from '../../../services/categoria/categoria.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categoria-list',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './categoria-list.component.html',
  styleUrl: './categoria-list.component.css',
})
export class CategoriaListComponent {
  categoriasMap: Map<number, Categoria> = new Map<number, Categoria>();
  nombreCategoria: string = '';
  descripcionCategoria: string = '';
  nombreCategoriaP: string = '';
  descripcionCategoriaP: string = '';
  categoriaId: number = 0;

  constructor(private categoriaService: CategoriaService) {}

  ngOnInit() {
    this.categoriaService.getCategorias().subscribe((res) => {
      for (const val of res) {
        this.categoriasMap.set(val.id, val);
      }
    });
  }

  getCategoria(id: number) {
    const categoria = this.categoriasMap.get(id);
    this.categoriaId = id;
    if (categoria) {
      this.nombreCategoria = categoria.nombreCategoria;
      this.descripcionCategoria = categoria.descripcionCategoria;
    }
  }

  postCategoria() {
    const categoriaSchema = {
      id: 0,
      nombreCategoria: this.nombreCategoriaP,
      descripcionCategoria: this.descripcionCategoriaP,
    };

    this.categoriaService
      .postCategoria(categoriaSchema)
      .subscribe((res) => location.reload());
  }

  putCategoria() {
    const categoriaSchema = {
      id: this.categoriaId,
      nombreCategoria: this.nombreCategoria,
      descripcionCategoria: this.descripcionCategoria,
    };
    this.categoriaService
      .putCategoria(this.categoriaId, categoriaSchema)
      .subscribe((res) =>
        Swal.fire(
          'Actualizado',
          'Tabla ' +
            this.categoriasMap.get(this.categoriaId)?.nombreCategoria +
            ' actualizada con éxito',
          'success'
        ).then((res) => location.reload())
      );
  }

  deleteCategoria(id: number): void {
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
        this.categoriaService.deleteCategoria(id).subscribe((res) => {
          Swal.fire(
            'Eliminado',
            'Tabla ' +
              this.categoriasMap.get(id)?.nombreCategoria +
              ' eliminada',
            'success'
          ).then((res) => location.reload());
        });
      }
    });
  }
}
