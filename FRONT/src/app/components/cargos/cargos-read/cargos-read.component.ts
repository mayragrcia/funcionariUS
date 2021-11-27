import { CargosService } from '../cargos.service';
import { Cargos } from '../cargos.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cargos-read',
  templateUrl: './cargos-read.component.html',
  styleUrls: ['./cargos-read.component.css']
})
export class CargosReadComponent implements OnInit {

  cargos!: Cargos[]
  displayedColumns = ['nomeCargo', 'id', 'action']

  constructor(
    private cargosService: CargosService
  ) { }

  ngOnInit(): void {
    this.cargosService.read().subscribe(cargos => {
      this.cargos = cargos
      console.log(cargos)
    })
  }

}
