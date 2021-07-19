import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AcoesComponent } from './acoes.component';

export const routes: Routes = [
  {
    path: '',
    component: AcoesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  //Método que cria um NgModule que contém todas as diretivas e as rotas, mas não inclui o Router service.
  exports: [RouterModule],
})
export class AcoesRoutingModule {}
