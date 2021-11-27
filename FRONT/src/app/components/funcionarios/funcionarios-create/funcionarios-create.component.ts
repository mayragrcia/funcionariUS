import { Funcionarios } from '../funcionarios.model';
import { FuncionariosService } from '../funcionarios.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Cargos } from '../../cargos/cargos.model';
import { CargosService } from '../../cargos/cargos.service';

import { HeaderService } from 'src/app/components/template/header/header.service';

@Component({
  selector: 'app-funcionarios-create',
  templateUrl: './funcionarios-create.component.html',
  styleUrls: ['./funcionarios-create.component.css']
})
export class FuncionariosCreateComponent implements OnInit {

  funcionario: Funcionarios = {
    nomeCompleto: '',
    cpf: '',
    salarioBruto: null,
    idCargoFuncionario: ''
  }

  cargos: Cargos[] = [{
    id: '',
    nomeCargo: 'f'
  }]

  constructor(
    private funcionariosService: FuncionariosService,
    private cargosService: CargosService,
    private router: Router,
    private headerService: HeaderService
  ) {
    headerService.headerData = {
      title: 'Cadastrar Funcionário',
      icon: 'group_add',
      routeUrl: '/funcionarios'
    }
  }

  ngOnInit(): void {
    this.cargosService.read().subscribe(cargos => {
      this.cargos = cargos
      console.log(cargos)
    })
  }

  createFuncionario(): void {
    this.funcionariosService.create(this.funcionario).subscribe(() => {
      this.funcionariosService.showMessage('Funcionário criado!')
      this.router.navigate(['/funcionarios'])
    })
  }

  cancel(): void {
    this.router.navigate(['/funcionarios'])
  }

}
