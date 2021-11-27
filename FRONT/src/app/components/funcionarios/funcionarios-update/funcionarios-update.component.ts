import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Funcionarios } from '../funcionarios.model';
import { FuncionariosService } from '../funcionarios.service';
import { Cargos } from '../../cargos/cargos.model';
import { CargosService } from '../../cargos/cargos.service';
import { HeaderService } from 'src/app/components/template/header/header.service';

@Component({
  selector: 'app-funcionarios-update',
  templateUrl: './funcionarios-update.component.html',
  styleUrls: ['./funcionarios-update.component.css']
})
export class FuncionariosUpdateComponent implements OnInit {

  funcionario: Funcionarios = {
    id: '',
    nomeCompleto: '',
    cpf: '',
    idCargoFuncionario: '',
    salarioBruto: null
  }

  cargos: Cargos[] = [{
    id: '',
    nomeCargo: 'f'
  }]

  constructor(
    private funcionariosService: FuncionariosService,
    private router: Router,
    private route: ActivatedRoute,
    private cargosService: CargosService,
    private headerService: HeaderService
  ) {
    headerService.headerData = {
      title: 'Editar Funcionário',
      icon: 'edit',
      routeUrl: '/funcionarios'
    }
  }

  ngOnInit(): void {
    const id: string = this.route.snapshot.params.id
    this.funcionariosService.readById(id).subscribe(funcionario => {
      this.funcionario = funcionario
      console.log(funcionario)
    })

    this.cargosService.read().subscribe(cargos => {
      this.cargos = cargos
      console.log(cargos)
    })
  }

  updateFuncionario(): void {
    this.funcionariosService.update(this.funcionario).subscribe(() => {
      this.funcionariosService.showMessage('Funcionário atualizado com sucesso!')
      this.router.navigate(['/funcionarios'])
    })
  }

  cancel(): void {
    this.router.navigate(['/funcionarios'])
  }

}
