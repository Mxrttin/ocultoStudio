import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'adminpedidos',
    loadChildren: () => import('./pages/adminpedidos/adminpedidos.module').then( m => m.AdminpedidosPageModule)
  },
  {
    path: 'adminprincipal',
    loadChildren: () => import('./pages/adminprincipal/adminprincipal.module').then( m => m.AdminprincipalPageModule)
  },
  {
    path: 'adminproductos',
    loadChildren: () => import('./pages/adminproductos/adminproductos.module').then( m => m.AdminproductosPageModule)
  },
  {
    path: 'adminusuarios',
    loadChildren: () => import('./pages/adminusuarios/adminusuarios.module').then( m => m.AdminusuariosPageModule)
  },
  {
    path: 'agregarproductos',
    loadChildren: () => import('./pages/agregarproductos/agregarproductos.module').then( m => m.AgregarproductosPageModule)
  },
  {
    path: 'cambiarpassword',
    loadChildren: () => import('./pages/cambiarpassword/cambiarpassword.module').then( m => m.CambiarpasswordPageModule)
  },
  {
    path: 'carrito',
    loadChildren: () => import('./pages/carrito/carrito.module').then( m => m.CarritoPageModule)
  },
  {
    path: 'catalogo',
    loadChildren: () => import('./pages/catalogo/catalogo.module').then( m => m.CatalogoPageModule)
  },
  {
    path: 'cuenta',
    loadChildren: () => import('./pages/cuenta/cuenta.module').then( m => m.CuentaPageModule)
  },
  {
    path: 'detalle-item',
    loadChildren: () => import('./pages/detalle-item/detalle-item.module').then( m => m.DetalleItemPageModule)
  },
  {
    path: 'detallepedido',
    loadChildren: () => import('./pages/detallepedido/detallepedido.module').then( m => m.DetallepedidoPageModule)
  },
  {
    path: 'editarproductos',
    loadChildren: () => import('./pages/editarproductos/editarproductos.module').then( m => m.EditarproductosPageModule)
  },
  {
    path: 'envio',
    loadChildren: () => import('./pages/envio/envio.module').then( m => m.EnvioPageModule)
  },
  {
    path: 'infousuario',
    loadChildren: () => import('./pages/infousuario/infousuario.module').then( m => m.InfousuarioPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'recuperarpassword',
    loadChildren: () => import('./pages/recuperarpassword/recuperarpassword.module').then( m => m.RecuperarpasswordPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'agregardireccion',
    loadChildren: () => import('./pages/agregardireccion/agregardireccion.module').then( m => m.AgregardireccionPageModule)
  },
  {
    path: 'modificardireccion',
    loadChildren: () => import('./pages/modificardireccion/modificardireccion.module').then( m => m.ModificardireccionPageModule)
  },
  {
    path: '**',
    loadChildren: () => import('./pages/notfound/notfound.module').then( m => m.NotfoundPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
