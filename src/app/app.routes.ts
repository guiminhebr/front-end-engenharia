import { Routes } from '@angular/router';
import { Principal } from './components/layout/principal/principal';
import { IntervaloList } from './components/intervalo/intervalo-list/intervalo-list';
import { IntervaloComponent } from './components/intervalo/intervalo-component/intervalo-component';
import { UploadImages } from './components/upload-images/upload-images';

export const routes: Routes = [

{path: "", redirectTo: "principal", pathMatch: 'full'},
    {path:"principal", component: Principal, children: [
        {path: "intervalos", component: IntervaloList}, 
   {path: "intervalos/new", component: IntervaloComponent},
   {path: "intervalos/edit/:id", component: IntervaloComponent}, 
   {path: "fotos", component: UploadImages}
    ]
    }, 
   
	



];
