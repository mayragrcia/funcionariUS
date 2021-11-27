import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/template/header/header.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { FooterComponent } from './components/template/footer/footer.component';
import { NavComponent } from './components/template/nav/nav.component'

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { HomeComponent } from './views/home/home.component';
import { RedDirective } from './directives/red.directive';
import { ForDirective } from './directives/for.directive';
import { MatButtonModule } from '@angular/material/button'
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http'
import { MatSelectModule } from '@angular/material/select';
import { NgxCurrencyModule } from 'ngx-currency';

import { NgxMaskModule } from 'ngx-mask'
import { FormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort'
import localePt from '@angular/common/locales/pt'
import { registerLocaleData } from '@angular/common';
import { CargosCreateComponent } from './components/cargos/cargos-create/cargos-create.component';
import { CargosCrudComponent } from './views/cargos-crud/cargos-crud.component';
import { CargosReadComponent } from './components/cargos/cargos-read/cargos-read.component';
import { CargosDeleteComponent } from './components/cargos/cargos-delete/cargos-delete.component';
import { CargosUpdateComponent } from './components/cargos/cargos-update/cargos-update.component';

registerLocaleData(localePt)

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    HomeComponent,
    RedDirective,
    ForDirective,
    CargosCreateComponent,
    CargosCrudComponent,
    CargosReadComponent,
    CargosDeleteComponent,
    CargosUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    NgxMaskModule.forRoot({
      showMaskTyped: false
    }),
    NgxCurrencyModule
  ],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'pt-BR'
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
