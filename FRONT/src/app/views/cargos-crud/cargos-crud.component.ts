import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { HeaderService } from 'src/app/components/template/header/header.service';

@Component({
  selector: 'app-cargos-crud',
  templateUrl: './cargos-crud.component.html',
  styleUrls: ['./cargos-crud.component.css']
})
export class CargosCrudComponent implements OnInit {

  constructor(private router: Router, private headerService: HeaderService) {
    headerService.headerData = {
      title: 'Cadastro de Cargos',
      icon: 'assignment_ind',
      routeUrl: '/products'
    }
  }

  ngOnInit(): void {
  }

  navigateToCargosCreate(): void {
    this.router.navigate(['/cargos/create'])
  }

}