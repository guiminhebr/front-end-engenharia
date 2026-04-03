import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { IntervaloService } from '../../../services/intervalo-service';
import { IntervaloModel } from '../../../models/intervalo-model';

@Component({
  selector: 'app-intervalo-list',
  imports: [],
  templateUrl: './intervalo-list.html',
  styleUrl: './intervalo-list.scss',
  standalone: true
})
export class IntervaloList {
ngOnInit() {
    console.log("COMPONENTE INICIADO");
    this.findAll();
  }


  //pra invocarmos o service
   //pra conseguri invcar o service
   Service = inject(IntervaloService);
   //usar os roteadores futuramente


  rota = inject(Router);
  lista: IntervaloModel[] =[];
  findAll(){
    this.Service.findAll().subscribe({
      next: lista => {
        console.log("DADOS:", lista);
  console.log("É ARRAY?", Array.isArray(lista));

          this.lista = lista;

      }, error: erro =>{
          console.error(erro);

        alert("erro em listar!")
      }
    })
  }

  
  delete(i: IntervaloModel){
  this.Service.delete(i).subscribe(
    {
      next: mensagem => {
        alert(mensagem);
        this.findAll();
      },error: erro =>{
        alert("erro em deletar!")
      }
    }
  )
}

edit(id:number){
  this.rota.navigate(['principal/intervalos/edit', id]);

}




}
    






