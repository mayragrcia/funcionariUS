import { Folha, CreateFolha } from './folha.model';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class FolhaService {

  baseUrl = "https://localhost:7288/FolhaSalarial"

  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success']
    })
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage('Ocorreu um erro!', true)
    return EMPTY
  }

  create(folha: CreateFolha): Observable<CreateFolha> {
    const url = `${this.baseUrl}/CalcularFolha?cpf=${folha.cpf}&horasTrabalhadas=${folha.horasTrabalhadas}`
    return this.http.post<CreateFolha>(url, {}).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  read(): Observable<Folha[]> {
    return this.http.get<Folha[]>(this.baseUrl).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  readByFuncionarioId(id: string): Observable<Folha[]> {
    const url = `${this.baseUrl}/${id}`
    return this.http.get<Folha[]>(url).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }
}
