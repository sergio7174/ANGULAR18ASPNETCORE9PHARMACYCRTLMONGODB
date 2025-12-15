import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css'
})
export class LoadingComponent {

  loading = false;
  
  ngOninit(){ console.log("cargando...")}

}
