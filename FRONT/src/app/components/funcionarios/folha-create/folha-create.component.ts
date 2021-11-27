import { FolhaService } from '../folha.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderService } from '../../template/header/header.service';

import { Funcionarios } from '../funcionarios.model';
import { FuncionariosService } from '../funcionarios.service';
import { CreateFolha } from '../folha.model';

@Component({
  selector: 'app-folha-create',
  templateUrl: './folha-create.component.html',
  styleUrls: ['./folha-create.component.css']
})
export class FolhaCreateComponent implements OnInit {

  funcionario: Funcionarios = {
    id: '',
    idCargoFuncionario: '',
    nomeCompleto: '',
    salarioBruto: null,
    cpf: ''
  }

  folha: CreateFolha = {
    cpf: '',
    horasTrabalhadas: null
  }

  constructor(
    private folhaService: FolhaService,
    private router: Router,
    private route: ActivatedRoute,
    private headerService: HeaderService,
    private funcionariosService: FuncionariosService
  ) {
    headerService.headerData = {
      title: 'Nova Folha de Pagamento',
      icon: 'monetization_on',
      routeUrl: '/funcionarios'
    }
  }

  ngOnInit(): void {
    const id: string = this.route.snapshot.params.id
    this.funcionariosService.readById(id).subscribe(funcionario => {
      this.funcionario = funcionario
      this.folha.cpf = funcionario.cpf
    })
  }

  create(): void {
    this.folhaService.create(this.folha).subscribe(() => {
      this.folhaService.showMessage('Folha criada!')
      this.router.navigate([`/funcionario/${this.funcionario.id}`])
    })
  }

  cancel(): void {
    this.router.navigate([`/funcionario/${this.funcionario.id}`])
  }

}
