import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cargos } from '../cargos.model';
import { CargosService } from '../cargos.service';
import { HeaderService } from 'src/app/components/template/header/header.service';

@Component({
  selector: 'app-cargos-delete',
  templateUrl: './cargos-delete.component.html',
  styleUrls: ['./cargos-delete.component.css']
})
export class CargosDeleteComponent implements OnInit {

  cargo: Cargos = {
    id: '',
    nomeCargo: ''
  }

  constructor(
    private cargosService: CargosService,
    private router: Router,
    private route: ActivatedRoute,
    private headerService: HeaderService
  ) {
    headerService.headerData = {
      title: 'Excluir Cargo',
      icon: 'delete',
      routeUrl: '/cargos'
    }
  }

  ngOnInit(): void {
    const id: string = this.route.snapshot.params.id
    this.cargosService.readById(id).subscribe(cargo => {
      this.cargo = cargo
    })
  }

  deleteCargo(): void {
    this.cargosService.delete(this.cargo.id).subscribe(() => {
      this.cargosService.showMessage('Cargo excluído!')
      this.router.navigate(['/cargos'])
    })
  }

  cancel(): void {
    this.router.navigate(['/cargos'])
  }

}
