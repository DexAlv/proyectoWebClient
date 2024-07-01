import { Component } from '@angular/core';
import { Vendedor } from '../../../interfaces/vendedor';
import { VendedorService } from '../../../services/vendedor/vendedor.service';

@Component({
  selector: 'app-vendedor-list',
  standalone: true,
  imports: [],
  templateUrl: './vendedor-list.component.html',
  styleUrl: './vendedor-list.component.css',
})
export class VendedorListComponent {
  vendedores: Vendedor[] = [];

  constructor(private vendedorService: VendedorService) {}

  ngOnInit() {
    this.vendedorService.getVendedores().subscribe((res) => {
      console.log(res);
      this.vendedores = res;
    });
  }
}
