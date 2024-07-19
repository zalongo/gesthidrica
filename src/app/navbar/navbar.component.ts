import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { Router, RouterLink, RouterModule } from '@angular/router';
import {  ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, LoginComponent,ReactiveFormsModule,RouterLink,RouterModule],
  templateUrl: "./navbar.component.html",
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent { 

  trackById(index: number, item: any) {
    return item.id;
  }
  notificationsEnabled = true;
  changeLanguage =[
    {id:1, texto:'Español'},
    {id:2, texto:'Ingles'}
  ]

  notificaciones1 = [
    { id: 1, texto: 'El caudal esta cerrado' },
  ];

  notificaciones2 = [
    { id: 2, texto2: 'Temperatura muy alta' },
  ];

  notificaciones3 = [
    { id: 3, texto3: 'Estado de la Humedad: Normal' },
    { id: 3, texto3: 'Probando... '}
  ];

  deleteNotification1(notificationId: number) {
    const index = this.notificaciones1.findIndex(notif => notif.id === notificationId);
    if (index !== -1) {
      this.notificaciones1.splice(index, 1);
    }
  }
  deleteNotification2(notificationId: number) {
    const index = this.notificaciones2.findIndex(notif => notif.id === notificationId);
    if (index !== -1) {
      this.notificaciones2.splice(index, 1);
    }
  }
  deleteNotification3(notificationId: number) {
    const index = this.notificaciones3.findIndex(notif => notif.id === notificationId);
    if (index !== -1) {
      this.notificaciones3.splice(index, 1);
    }
  }


  toggleNotifications() {
    this.notificationsEnabled = !this.notificationsEnabled;
  }
  toggleLanguage() {
  }

  isOpen = false;
  isOpenConf = false;

  openNot() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      addEventListener("click", this.closeModal);
    } else {
      removeEventListener("click", this.closeModal);
    }
    this.isOpenConf = false;
  }

  closeModal() {
    this.isOpen = false;
  }

  openConf() {
    this.isOpenConf = !this.isOpenConf; // Alterna el valor de isOpen
    if (this.isOpenConf) {
      addEventListener("click", this.closeModalConf);
    } else {
      removeEventListener("click", this.closeModalConf);
    }
    this.isOpen = false;
  }
  closeModalConf() {
    this.isOpenConf = false;
  }

  isNotificacionesOpen: boolean = false;

  constructor(private router: Router) {}

  openNotificaciones() {
    this.isNotificacionesOpen = true;
  }

  closeNotificaciones() {
    this.isNotificacionesOpen = false;
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}