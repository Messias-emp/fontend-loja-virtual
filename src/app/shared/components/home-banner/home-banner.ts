import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-home-banner',
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './home-banner.html',
  styleUrl: './home-banner.scss',
})
export class HomeBanner {

   // 🎯 Dados podem virar dinâmicos no futuro (API / CMS)
   title = "Promoção de Tecnologia";
   subtitle = "Equipamentos de informática com até 30% OFF";
   ctaText = "Ver Ofertas";

}
