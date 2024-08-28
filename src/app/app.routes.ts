
import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent: async () => ((await import('./pages/news-list/news-list.component')).NewsListComponent),
        data: {
          pageTitle: 'News-List'
        }
      },
      {
        path: ':id',
        loadComponent: async () => ((await import('./pages/news-details/news-details.component')).NewsDetailsComponent),
        data: {
          pageTitle: 'News-Details'
        }
      }
];

