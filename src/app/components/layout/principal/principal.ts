import { Component } from '@angular/core';
import { RouterOutlet

 } from '@angular/router';
import { Menu } from '../menu/menu';
import { Dashboard } from "../dashboard/dashboard";
@Component({
  selector: 'app-principal',
  imports: [RouterOutlet, Menu, Dashboard],
  templateUrl: './principal.html',
  styleUrl: './principal.scss',
})
export class Principal {

}
