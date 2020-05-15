import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers:[UserService]
})
export class UserEditComponent implements OnInit {

	public page_title: string;
	public user: User;
	public identity;
	public token;
	public status: string;
  constructor(
  		private _userService: UserService
  	){ 
  		this.page_title = 'Ajueste de usuario';
  		this.user = new User(1,'','','ROLE_USER','','','','');
  		this.identity = this._userService.getIdentity();
  		this.token = this._userService.getToken();
  		
  		// Relleno datos del usuario
  		this.user = new User(
  			this.identity.sub,
  			this.identity.name,
  			this.identity.surname,
  			this.identity.role,
  			this.identity.email,'',
  			this.identity.description,
  			this.identity.image);

  }

  ngOnInit(): void {
  }

  onSubmit(form){
  	this._userService.update(this.token, this.user).subscribe(
  		response =>{
  			if (response) {
  				console.log(response);
  				this.status ='success';

  				// Actualizar usuario en session
  				if(response.changes.name){
  					this.user.name = response.changes.name;
  				}

  				if(response.changes.surname){
  					this.user.surname = response.changes.surname;
  				}

  				if(response.changes.mail){
  					this.user.mail = response.changes.mail;
  				}

  				if(response.changes.description){
  					this.user.description = response.changes.description;
  				}

  				if(response.changes.image){
  					this.user.image = response.changes.image;
  				}

  				this.identity = this.user;
  				localStorage.setItem('identity', JSON.stringify(this.identity));

  			} else {
  				 this.status ='error';	
  			}
  		},
  		error =>{
  			this.status ='error';
  			console.log  (<any>error);
  			console.log ('No actualizo');
  		}	

  		);
  }

}
