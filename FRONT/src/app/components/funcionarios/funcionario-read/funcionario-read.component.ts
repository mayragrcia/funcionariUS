import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Funcionarios } from '../funcionarios.model';
import { FuncionariosService } from '../funcionarios.service';
import { HeaderService } from '../../template/header/header.service';

import { Folha } from '../folha.model';
import { FolhaService } from '../folha.service';

import { CargosService } from '../../cargos/cargos.service';
import { Cargos } from '../../cargos/cargos.model';

@Component({
  selector: 'app-funcionario-read',
  templateUrl: './funcionario-read.component.html',
  styleUrls: ['./funcionario-read.component.css']
})
export class FuncionarioReadComponent implements OnInit {

  funcionario: Funcionarios = {
    id: '',
    nomeCompleto: '',
    cpf: '',
    salarioBruto: null,
    idCargoFuncionario: ''
  }

  folha!: Folha[]

  cargo!: Cargos

  displayedColumns = ['competencia', 'horasTrabalhadas', 'inss', 'irrf', 'salarioBruto', 'salarioLiquido']

  constructor(
    private funcionariosService: FuncionariosService,
    private router: Router,
    private route: ActivatedRoute,
    private folhaService: FolhaService,
    private headerService: HeaderService,
    private cargosService: CargosService
  ) {
    headerService.headerData = {
      title: 'Detalhes',
      icon: 'remove_red_eye',
      routeUrl: '/funcionarios'
    }
  }

  ngOnInit(): void {
    const id: string = this.route.snapshot.params.id
    this.funcionariosService.readById(id).subscribe(funcionario => {
      this.funcionario = funcionario

      this.cargosService.readById(funcionario.idCargoFuncionario).subscribe(cargo => {
        this.cargo = cargo
        console.log(cargo)
      })
    })

    this.folhaService.readByFuncionarioId(id).subscribe(folha => {
      this.folha = folha
      console.log(folha)
    })

    

  }

  voltar(): void {
    this.router.navigate(['/funcionarios'])
  }

}
