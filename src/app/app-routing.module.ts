import { NgModule } from '@angular/core'
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'v1/folder/my-deck',
    pathMatch: 'full',
  },
  {
    path: 'v1/login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'v1/folder/my-deck',
    loadChildren: () =>
      import('./my-deck/my-deck.module').then((m) => m.MyDeckPageModule),
  },
  {
    path: 'v1/folder/decks',
    loadChildren: () =>
      import('./decks/decks.module').then((m) => m.DecksPageModule),
  },
  {
    path: 'v1/folder/statistics',
    loadChildren: () =>
      import('./statistics/statistics.module').then(
        (m) => m.StatisticsPageModule
      ),
  },
  {
    path: 'v1/folder/feedback',
    loadChildren: () =>
      import('./feedback/feedback.module').then((m) => m.FeedbackPageModule),
  },
  {
    path: 'v1/folder/help',
    loadChildren: () =>
      import('./help/help.module').then((m) => m.HelpPageModule),
  },
  {
    path: 'v1/card/:deckId',
    loadChildren: () =>
      import('./card/card.module').then((m) => m.CardPageModule),
  },
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
