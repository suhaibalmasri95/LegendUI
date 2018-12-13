import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { AlertifyService } from '../../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: 'login.template.html'
})
export class LoginComponent implements OnInit {
  model: any = {};
  photoUrl: string;
  constructor(public authService: AuthService, private alertify: AlertifyService , private router: Router ) { }

  ngOnInit() {

  }
  login() {
    this.authService.login(this.model).subscribe(data => {
      this.alertify.success('logged in successfully ');
    }, error => {
     this.alertify.error('Falied to login');
    }, () => {
       this.router.navigate(['/organizations']);
    });
   }
}
