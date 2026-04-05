
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { IntervaloModel } from '../../../models/intervalo-model';
import { Inject } from '@angular/core';
import { inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IntervaloService } from '../../../services/intervalo-service';
import { Router } from '@angular/router';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-intervalo-component',
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './intervalo-component.html',
  styleUrl: './intervalo-component.scss',
})
export class IntervaloComponent {
  @Input("intervalo") intervalo: IntervaloModel = {
  status: '',
  numeroOs: '',
  inicio: '',
  fim: '',
  tipoIntervalo: '',
  kmInicial: '',
  kmFinal: '',
  trecho: '',
  observacao: '',
  data: ''

};
  @Output("retorno") retorno = new EventEmitter<any>;
  router = inject(ActivatedRoute);
  router2 = inject(Router);
  Servic = inject(IntervaloService);
  //podemops fazer o cadastro por rota, preencha as informações. tem q pegar o id
  //da rota usar findByid do back, preencher com o produto encontrado e preencher
  //inicializa o potencial id de algo que vou atualizar.

   constructor(){
    let id = this.router.snapshot.params['id'];//pega a variavel id
    if (id > 0){//se for maior que 0, e ubsuco o objeto no back e coloco no objeto Produto que vou editar lá em cima (input)
      this.findById(id);
    }
  }


 save(){
    if(this.intervalo?.id && this.intervalo.id > 0){
      this.Servic.update(this.intervalo).subscribe({
        next: mensagem => {
          alert(mensagem);
          this.retorno.emit(mensagem);
          this.router2.navigate(['principal/intervalos']);
        }, error: erro => {
          alert("erro ao atualizar!");
        }
      })
    }else {
   this.Servic.save(this.intervalo).subscribe({

      next: mensagem => {
       
        this.retorno.emit(mensagem); 
      this.router2.navigate(['principal/intervalos']); // opcional
      }, error: erro => {
          
        alert("Erro ao salvar")
      }
    })
    }

}

findById(id: number){
    //busca no back end
    this.Servic.findById(id).subscribe({
      next: retorno =>{
        this.intervalo = retorno; //o carro do input lá
      }, error: erro => {
        alert("erro na busca pelo ID")
      }
    })
  }



}
 
