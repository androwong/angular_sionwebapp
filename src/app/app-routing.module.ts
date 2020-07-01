// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	// {path: 'auth', loadChildren: () => import('app/views/pages/auth/auth.module').then(m => m.AuthModule)},

	// enable this router to set which demo theme to load,
	// leave the path value empty to enter into nested router in ThemeModule
	{path: '', loadChildren: 'app/views/auth/auth.module#AuthModule'},
	{path: 'home', loadChildren: 'app/views/home/home.module#HomeModule'},
	// {path: '', loadChildren: 'app/views/pages/auth/auth.module#AuthModule'},
	// {path: 'home', loadChildren: 'app/views/themes/theme.module#ThemeModule'},

	{path: '**', redirectTo: 'demo1/error/403', pathMatch: 'full'},
	// {path: '**', redirectTo: 'error/403', pathMatch: 'full'},
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes)
	],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
