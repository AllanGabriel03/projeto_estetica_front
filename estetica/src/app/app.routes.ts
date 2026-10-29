import { Routes } from '@angular/router';
import { Catalogo } from './loja/catalogo/catalogo';
import { Carrinho } from './loja/carrinho/carrinho';

export const routes: Routes = [
    {
        path:'',
        redirectTo: 'catalogo',
        pathMatch: 'full'
    },
    {
        path:'catalogo',
        component: Catalogo
    },
    {
        path:'carrinho',
        component: Carrinho
    }
];
