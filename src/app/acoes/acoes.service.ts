import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, pluck, tap } from 'rxjs/operators';
import { Acao, AcoesAPI } from './modelo/acoes';

@Injectable({
  providedIn: 'root',
})
export class AcoesService {
  constructor(private httpClient: HttpClient) {}

  getAcoes(valor?: string) {
    const params = valor ? new HttpParams().append('valor', valor) : undefined;
    return this.httpClient
      .get<AcoesAPI>('http://localhost:3000/acoes', { params })
      .pipe(
        //Transformar dados no modelo.
        tap((valor) => console.log(valor)),
        //Operador que olha para o valor do observable e executa algo com esse valor.
        pluck('payload'),
        //Seleciona uma propriedade para emitir.
        map((acoes) =>
        //Adiciona projeção para cada valor da source.
          acoes.sort((acaoA, acaoB) => this.ordenaPorCodigo(acaoA, acaoB))
        )
      );
    //O Observable representa uma coleção de eventos ou valores que ocorrem
    //no tempo. E a melhor representação de um Observable é um cano, porém,
    //em vez de passar água ou encanadores italianos, passa valores ou objetos JavaScript.
  }

  private ordenaPorCodigo(acaoA: Acao, acaoB: Acao) {
    if (acaoA.codigo > acaoB.codigo) {
      return 1;
    }
    if (acaoA.codigo < acaoB.codigo) {
      return -1;
    }

    return 0;
  }
}
