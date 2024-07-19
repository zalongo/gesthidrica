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

  notificaciones = [
    { id: 1, texto: 'notificacion 1' },
    { id: 2, texto: 'notificacion 2' },
    { id: 3, texto: 'notificacion 3' },
    { id: 4, texto: 'notificacion 4' }

  ];

  deleteNotification(notificationId: number) {
    const index = this.notificaciones.findIndex(notif => notif.id === notificationId);
    if (index !== -1) {
      this.notificaciones.splice(index, 1);
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