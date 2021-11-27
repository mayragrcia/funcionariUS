import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Funcionarios } from '../funcionarios.model';
import { FuncionariosService } from '../funcionarios.service';
import { HeaderService } from 'src/app/components/template/header/header.service';

@Component({
  selector: 'app-funcionarios-delete',
  templateUrl: './funcionarios-delete.component.html',
  styleUrls: ['./funcionarios-delete.component.css']
})
export class FuncionariosDeleteComponent implements OnInit {

  funcionario: Funcionarios = {
    id: '',
    nomeCompleto: '',
    cpf: '',
    salarioBruto: null,
    idCargoFuncionario: ''
  }

  constructor(
    private funcionariosService: FuncionariosService,
    private router: Router,
    private route: ActivatedRoute,
    private headerService: HeaderService
  ) {
    headerService.headerData = {
      title: 'Excluir Funcionário',
      icon: 'delete',
      routeUrl: '/funcionarios'
    }
  }

  ngOnInit(): void {
    const id: string = this.route.snapshot.params.id
    this.funcionariosService.readById(id).subscribe(funcionario => {
      this.funcionario = funcionario
    })
  }

  deleteFuncionario(): void {
    this.funcionariosService.delete(this.funcionario.id).subscribe(() => {
      this.funcionariosService.showMessage('Funcionário excluído!')
      this.router.navigate(['/funcionarios'])
    })
  }

  cancel(): void {
    this.router.navigate(['/funcionarios'])
  }

}
