import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { LogementComponent } from './logement/logement.component';
import { LogementListComponent } from './logement-list/logement-list.component';
import { LogementDetailsComponent } from './logement-details/logement-details.component';
import { ColocationHistoriqueComponent} from './historique-colocations/historique-colocations.component';
import { UserListComponent } from './user-list/user-list.component';
import { AdminAnnonceComponent } from './admin-annonce/admin-annonce.component';




const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'logement', component: LogementComponent },
{path: 'navbar' , component: NavbarComponent},
  { path: 'logements', component: LogementListComponent },
  { path: 'logement/details/:id', component: LogementDetailsComponent },
  { path: 'historique-colocations', component: ColocationHistoriqueComponent },
  {path: 'colocataires' , component: UserListComponent},
  {path: 'admin-annonces' , component: AdminAnnonceComponent},

  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
