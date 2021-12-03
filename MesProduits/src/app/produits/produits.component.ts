import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/produit.model';
import { ProduitService } from '../services/produit.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css'],
})
export class ProduitsComponent implements OnInit {
  produits?: Produit[]; //un tableau de chînes de caractères

  constructor(
    private produitService: ProduitService,
    private router: Router,
    public authService: AuthService
  ) {
    // this.produits = produitService.listeProduits();
  }

  ngOnInit(): void {
    this.produitService.listeProduit().subscribe((prods) => {
      console.log(prods);
      this.produits = prods;
    });
  }

  supprimerProduit(p: Produit) {
    let conf = confirm('Etes-vous sûr ?');
    if (conf)
      this.produitService.supprimerProduit(p.idProduit).subscribe(() => {
        console.log('produit supprimé');
        this.SuprimerProduitDuTableau(p);
      });
  }
  SuprimerProduitDuTableau(prod: Produit) {
    this.produits?.forEach((cur, index) => {
      if (prod.idProduit === cur.idProduit) {
        this.produits?.splice(index, 1);
      }
    });
  }
}
