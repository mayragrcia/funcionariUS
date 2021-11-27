import { FuncionariosService } from '../funcionarios.service';
import { Funcionarios } from './../funcionarios.model'
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-funcionarios-read',
  templateUrl: './funcionarios-read.component.html',
  styleUrls: ['./funcionarios-read.component.css']
})
export class FuncionariosReadComponent implements OnInit {

  funcionarios!: Funcionarios[]

  displayedColumns = ['id', 'nomeCompleto', 'cpf', 'salarioBruto', 'idCargoFuncionario', 'action']

  constructor(
    private funcionariosService: FuncionariosService
  ) { }

  ngOnInit(): void {
    this.funcionariosService.read().subscribe(funcionarios => {
      this.funcionarios = funcionarios
      console.log(funcionarios)
    })
  }

}
