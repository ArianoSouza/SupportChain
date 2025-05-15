import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: false,
})
export class TabsPage {

  constructor(private route: ActivatedRoute, private router: Router) {}
  usuario: string = '';
  
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['usuario']) {
        this.usuario = params['usuario'];
        this.updateTabsWithParams();
      }
    });
  }

  updateTabsWithParams() {
    const navExtras = {
      queryParams: { usuario: this.usuario }
    };

    // Atualiza as rotas das abas manualmente
    this.router.navigate(['/tabs/home'], navExtras);
  }

}
