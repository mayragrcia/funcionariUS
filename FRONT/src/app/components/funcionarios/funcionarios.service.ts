import { Funcionarios } from './funcionarios.model';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { HttpClient } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class FuncionariosService {

  baseUrl = "https://localhost:7288/Funcionario"

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

  errorHandler(e: any) : Observable<any> {
    this.showMessage('Ocorreu um erro!', true)
    return EMPTY
  }

  create(funcionario: Funcionarios): Observable<Funcionarios[]> {
    const url = `${this.baseUrl}`
    return this.http.post<Funcionarios[]>(url, funcionario).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  read(): Observable<Funcionarios[]> {
    return this.http.get<Funcionarios[]>(this.baseUrl).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  readById(id: string): Observable<Funcionarios> {
    const url = `${this.baseUrl}/${id}`
    return this.http.get<Funcionarios>(url).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  update(funcionario: Funcionarios): Observable<Funcionarios> {
    return this.http.put<Funcionarios>(this.baseUrl, funcionario).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  delete(id: any): Observable<Funcionarios> {
    const url = `${this.baseUrl}/${id}`
    return this.http.delete<Funcionarios>(url).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }
}
