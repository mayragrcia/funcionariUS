import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { HeaderService } from 'src/app/components/template/header/header.service';

@Component({
  selector: 'app-funcionarios-crud',
  templateUrl: './funcionarios-crud.component.html',
  styleUrls: ['./funcionarios-crud.component.css']
})
export class FuncionariosCrudComponent implements OnInit {

  constructor(private router: Router, private headerService: HeaderService) {
    headerService.headerData = {
      title: 'Cadastro de Funcionarios',
      icon: 'group',
      routeUrl: '/funcionarios'
    }
  }

  ngOnInit(): void {
  }

  navigateToFuncionariosCreate(): void {
    this.router.navigate(['/funcionarios/create'])
  }

}
