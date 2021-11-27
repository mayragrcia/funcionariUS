import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cargos } from '../cargos.model';
import { CargosService } from '../cargos.service';
import { HeaderService } from 'src/app/components/template/header/header.service';

@Component({
  selector: 'app-cargos-update',
  templateUrl: './cargos-update.component.html',
  styleUrls: ['./cargos-update.component.css']
})
export class CargosUpdateComponent implements OnInit {

  cargos: Cargos = {
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
      title: 'Editar Cargo',
      icon: 'edit',
      routeUrl: '/cargos'
    }
  }

  ngOnInit(): void {
    const id: string = this.route.snapshot.params.id
    this.cargosService.readById(id).subscribe(cargo => {
      this.cargos = cargo
      console.log(cargo)
    })
  }

  updateCargo(): void {
    this.cargosService.update(this.cargos).subscribe(() => {
      this.cargosService.showMessage('Cargo atualizado com sucesso!')
      this.router.navigate(['/cargos'])
    })
  }

  cancel(): void {
    this.router.navigate(['/cargos'])
  }

}
