export class IntervaloModel {

  tipoIntervalo: string;
  status: string;
  numeroOs: string;
 id?: number;
  trecho: string;
  kmInicial: string;
  kmFinal: string;

  data: string;
  inicio: string;
  fim: string;

  observacao: string;

  constructor(
    tipoIntervalo: string,
    status: string,
    numeroOs: string,
    trecho: string,
    kmInicial: string,
    kmFinal: string,
    data: string,
    inicio: string,
    fim: string,
    observacao: string,
    id: number
  ) {
    this.tipoIntervalo = tipoIntervalo;
    this.status = status;
    this.numeroOs = numeroOs;
    this.trecho = trecho;
    this.kmInicial = kmInicial;
    this.kmFinal = kmFinal;
    this.data = data;
    this.inicio = inicio;
    this.fim = fim;
    this.observacao = observacao;
    this.id = id;
  }


}




