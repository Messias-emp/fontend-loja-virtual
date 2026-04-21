import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { FooterComponent } 
from '../../../shared/components/navbar/footer.component';



@Component({
  standalone: true,
  selector: 'PublicLayoutComponent',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './public-layout-component.html',
  styleUrl: './public-layout-component.scss',
   styles: [`
    :host {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background-color: #f9fafb; /* cinza claro elegante */
    }

    .main-layout {
      flex: 1;
      max-width: 1200px; /* padrão e-commerce */
      margin: 0 auto;
      padding: 2rem 1rem;
      width: 100%;
    }
  `]
})
export class PublicLayoutComponent {
  

}

