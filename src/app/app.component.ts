import { Component } from '@angular/core';
import {FooterComponent}from "./components/footer/footer.component"
import { HeaderComponent } from "./components/Header/header.component";
import { RouterOutlet } from '@angular/router';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MakankWorkSpace';
}
