import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuardService } from '../user/auth-guard.service';

import {PageNotFoundComponent} from '../page-not-found/page-not-found.component';

const appRoutes: Routes = [
  {
    path: 'chat',
    canActivate: [ AuthGuardService ],
    loadChildren: 'app/chat/chat.module#ChatModule'
  },
  { path: '', redirectTo: 'chat/chat', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }