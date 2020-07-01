import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { BaseComponent } from './base/base.component';
import { FooterComponent } from './footer/footer.component';
import { BrandComponent } from './brand/brand.component';
import { SubheaderComponent } from './subheader/subheader.component';
import { AsideLeftComponent } from './aside/aside-left.component';
import { MenuHorizontalComponent } from './header/menu-horizontal/menu-horizontal.component';
import { ErrorPageComponent } from './content/error-page/error-page.component';
import { HtmlClassService } from './html-class.service';
import { RouterModule } from '@angular/router';
import { NgxPermissionsModule } from 'ngx-permissions';
import { StoreModule } from '@ngrx/store';
import { PermissionEffects, permissionsReducer, RoleEffects, rolesReducer } from '../../core/auth';
import { EffectsModule } from '@ngrx/effects';
import { PartialsModule } from '../partials/partials.module';
import { CoreModule } from '../../core/core.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule, MatTabsModule, MatButtonModule, MatTooltipModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { InlineSVGModule } from 'ng-inline-svg';
import { NgbProgressbarModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { HeaderMobileComponent } from './header/header-mobile/header-mobile.component';
import { TopbarComponent } from './header/topbar/topbar.component';


@NgModule({
  declarations: [
		BaseComponent,
		FooterComponent,

		// headers
		HeaderComponent,
		BrandComponent,
		HeaderMobileComponent,

		// subheader
		SubheaderComponent,

		// topbar components
		TopbarComponent,

		// aside left menu components
		AsideLeftComponent,

		// horizontal menu components
		MenuHorizontalComponent,

		ErrorPageComponent,
	],
	exports: [
		BaseComponent,
		FooterComponent,

		// headers
		HeaderComponent,
		BrandComponent,
		HeaderMobileComponent,

		// subheader
		SubheaderComponent,

		// topbar components
		TopbarComponent,

		// aside left menu components
		AsideLeftComponent,

		// horizontal menu components
		MenuHorizontalComponent,

		ErrorPageComponent,
	],
	providers: [
		HtmlClassService,
	],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CommonModule,
		RouterModule,
		NgxPermissionsModule.forChild(),
		StoreModule.forFeature('roles', rolesReducer),
		StoreModule.forFeature('permissions', permissionsReducer),
		EffectsModule.forFeature([PermissionEffects, RoleEffects]),
		PartialsModule,
		CoreModule,
		PerfectScrollbarModule,
		FormsModule,
		MatProgressBarModule,
		MatTabsModule,
		MatButtonModule,
		MatTooltipModule,
		TranslateModule.forChild(),
		LoadingBarModule,
		NgxDaterangepickerMd,
		InlineSVGModule,

		// ng-bootstrap modules
		NgbProgressbarModule,
		NgbTooltipModule,
  ]
})
export class HomeModule { }
