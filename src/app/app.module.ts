import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Importer FormsModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LogementComponent } from './logement/logement.component';
import { LogementListComponent } from './logement-list/logement-list.component';
import { LogementDetailsComponent } from './logement-details/logement-details.component';
import { ColocationHistoriqueComponent } from './historique-colocations/historique-colocations.component';
import { SliderModule } from 'primeng/slider';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MapComponent } from './map/map.component';
import { UserListComponent } from './user-list/user-list.component';
import { SpinnerModule } from 'primeng/spinner';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminAnnonceComponent } from './admin-annonce/admin-annonce.component';
import { AnnoncesComponent } from './annonces/annonces.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    HomeComponent,
    ProfileComponent,
    LogementComponent,
    LogementListComponent,
    LogementDetailsComponent,
    ColocationHistoriqueComponent,
    MapComponent,
    UserListComponent,
    AdminAnnonceComponent,
    AnnoncesComponent,
  ],

  
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SliderModule,
    AutoCompleteModule,
    SpinnerModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
