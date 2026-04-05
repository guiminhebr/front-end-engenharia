import { Injectable } from '@angular/core';
import {inject }  from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IntervaloModel } from '../models/intervalo-model';
@Injectable({
  providedIn: 'root',
})
export class IntervaloService {
  //injecção do http client
  http = inject(HttpClient);  
  API = "https://back-end-engenharia-production.up.railway.app/intervalos"

  //metodd do service qvai sugar os dados do back end
  findAll(): Observable<IntervaloModel[]>{
 return this.http.get<IntervaloModel[]>(this.API+"/trazerTodos");

}
  delete(intervalo: IntervaloModel): Observable<String>{
    return this.http.delete<String>(this.API+"/deletar/"+intervalo.id, {responseType:'text' as 'json'});
  }
  save(intervalo: IntervaloModel): Observable<String>{
    return this.http.post<String>(this.API+"/salvar", intervalo, {responseType:'text' as 'json'});
  }
   update(intervalo: IntervaloModel): Observable<String>{
    return this.http.put<String>(this.API+"/"+intervalo.id, intervalo, {responseType: 'text' as 'json'});
  }
  findById(id: number): Observable<IntervaloModel>{
    return this.http.get<IntervaloModel>(this.API+"/"+id);
  }
  


}
