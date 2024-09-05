import { Component, Input, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgOptimizedImage } from '@angular/common';
import { GoogleSheetsService } from '../services/google-sheets.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, RouterModule, NgOptimizedImage],
  templateUrl: "./navbar.component.html",
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  isMenuOpen = false;

  constructor(private router: Router, private googleSheetsService: GoogleSheetsService) { }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  navigateToHistoricos() {
    this.router.navigate(['/historicosEmpresa']);
  }

  handleAuthClick() {
    this.googleSheetsService.handleAuthClick();
  }

  trackById(index: number, item: any) {
    return item.id;
  }

  notificationsEnabled = true;

  changeLanguage = [
    { id: 1, texto: 'Español' },
    { id: 2, texto: 'Ingles' }
  ];

  notificaciones1 = [
    { id: 1, texto: 'El caudal esta cerrado' },
    { id: 2, texto: 'Temperatura muy alta' },
    { id: 3, texto: 'Estado de la Humedad: Normal' },
    { id: 4, texto: 'Probando... ' }
  ];

  deleteNotification1(notificationId: number) {
    const index = this.notificaciones1.findIndex(notif => notif.id === notificationId);
    if (index !== -1) {
      this.notificaciones1.splice(index, 1);
    }
  }

  toggleNotifications() {
    this.notificationsEnabled = !this.notificationsEnabled;
  }

  toggleLanguage() {}

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
    this.isOpenConf = !this.isOpenConf;
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

  navigateToDashboard() {
    this.router.navigate(['/empresa/:{id}']);
  }
}
