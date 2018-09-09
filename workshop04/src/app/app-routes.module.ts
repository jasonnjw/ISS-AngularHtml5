import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { ModelComponent } from './components/model.component';
import { SearchComponent} from './components/search.component';
import { CardComponent } from './components/card.component';

const ROUTES: Routes = [
  { path: '', component: ModelComponent},
  { path: 'card', component: CardComponent},
  { path: 'card/:category/:id', component: CardComponent},
  // { path: 'card/planets/:id', component: CardmodelComponent},
  // { path: 'card/vehicles', component: CardmodelComponent},
  // { path: 'card/person', component: CardmodelComponent},
  // { path: 'card/starships', component: CardmodelComponent},
  // { path: 'card/films', component: CardmodelComponent},
  // { path: 'card/species', component: CardmodelComponent},
  { path: 'search', component: SearchComponent},
  { path: '**', redirectTo: '/', pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(ROUTES)
  ],
  exports : [
    RouterModule
  ],
  declarations: []
})
export class AppRoutesModule { }
