// Angular
import { Component, Input, OnInit } from '@angular/core';
// RxJS
import { Observable } from 'rxjs';
// NGRX
import { select, Store } from '@ngrx/store';
// State
import { AppState } from '../../../../../core/reducers';
import { currentUser, Logout } from '../../../../../core/auth';
import { AuthService } from '../../../../auth/auth.service';
import { User } from '../../../../../_entities/User';
import { Router } from '@angular/router';

@Component({
	selector: 'kt-user-profile',
	templateUrl: './user-profile.component.html',
})
export class UserProfileComponent implements OnInit {
	// Public properties
	_user: User;

	@Input() avatar: boolean = true;
	@Input() greeting: boolean = true;
	@Input() badge: boolean;
	@Input() icon: boolean;

	/**
	 * Component constructor
	 *
	 * @param store: Store<AppState>
	 */
	constructor(private store: Store<AppState>, private auth: AuthService, private router: Router,) {
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit(): void {
		// this.user$ = this.store.pipe(select(currentUser));
		this._user = this.auth.getUser();
		console.log(this._user);
	}


	/**
	 * Log out
	 */
	logout() {
		this.auth.logout();
		this.router.navigate(['/login']);
		// this.store.dispatch(new Logout());
	}
}
