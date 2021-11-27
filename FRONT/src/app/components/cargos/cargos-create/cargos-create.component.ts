import { CargosService } from './../cargos.service';
import { Cargos } from '../cargos.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/components/template/header/header.service';

@Component({
  selector: 'app-cargos-create',
  templateUrl: './cargos-create.component.html',
  styleUrls: ['./cargos-create.component.css']
})
export class CargosCreateComponent implements OnInit {

  cargo: Cargos = {
    nomeCargo: ''
  }

  constructor(
    private cargosService: CargosService,
    private router: Router,
    private headerService: HeaderService
  ) {
    headerService.headerData = {
      title: 'Cadastrar Cargo',
      icon: 'add_circle',
      routeUrl: '/cargos'
    }
  }

  ngOnInit(): void {
  }

  createCargo(): void {
    this.cargosService.create(this.cargo).subscribe(() => {
      this.cargosService.showMessage('Cargo criado!')
      this.router.navigate(['/cargos'])
    })
  }

  cancel(): void {
    this.router.navigate(['/cargos'])
  }

}
