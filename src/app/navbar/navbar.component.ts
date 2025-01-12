import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  dropdownOpen = false;
  userRole: string | null = null;
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.getUserRole();
  }

  getUserRole() {
    const user = localStorage.getItem('user');
    console.log("user", user); 
    if (user) {
      const parsedUser = JSON.parse(user);
      this.userRole = parsedUser.role; 
    }
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  logout() {
    localStorage.removeItem('jwt_token'); 
    localStorage.removeItem('user'); 
    this.router.navigate(['/login']); 
  }

  

  
  
  isColocataireOrAdmin(): boolean {
    return this.userRole === 'colocataire' || this.userRole === 'admin';
  }
}
