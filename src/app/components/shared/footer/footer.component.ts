import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  irParaGustavoksbr(){
    this.router.navigate(['portfolios/gustavoksbr']);
  }
  constructor(private router: Router) {
  }

}
