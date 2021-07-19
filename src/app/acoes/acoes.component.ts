import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Acoes } from './modelo/acoes';
import { AcoesService } from './acoes.service';
import { merge, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs/operators';

const ESPERA_DIGITACAO = 300;
//300ms no debounceTime para lazy loading e otimizar o servidor.

@Component({
  selector: 'app-acoes',
  templateUrl: './acoes.component.html',
  styleUrls: ['./acoes.component.css'],
})
export class AcoesComponent {
  //onInit para carregar o atributo na criação do componente
  acoesInput = new FormControl();
  todasAcoes$ = this.acoesService.getAcoes().pipe(
    tap(() => {
      console.log('Fluxo inicial');
    })
  );
  filtroPeloInput$ = this.acoesInput.valueChanges.pipe(
    debounceTime(ESPERA_DIGITACAO),
    tap(() => {
      console.log('Fluxo do filtro');
    }),
    tap(console.log),
    filter(
      //Apenas filtra o item emitido pelo Observable com a emição daquele que satisfaz uma condição específica.
      (valorDigitado) => valorDigitado.length >= 3 || !valorDigitado.length
    ),
    distinctUntilChanged(),
    //Apenas emitido quando o valor atual é diferente do anterior.
    switchMap((valorDigitado) => this.acoesService.getAcoes(valorDigitado)),
    //Ignora os requests anteriores se um novo evento chegar. Obriga o retorno de um novo observable.
    tap(console.log)
  );

  acoes$ = merge(this.todasAcoes$, this.filtroPeloInput$);
  //Transforma vários observables em um único.

  constructor(private acoesService: AcoesService) {}
}
