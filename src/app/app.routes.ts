import { Routes } from '@angular/router';
import { RegisterformComponent } from './pages/registerform/registerform.component';
import { LoginformComponent } from './pages/loginform/loginform.component';
import { HomeComponent } from './pages/home/home.component';
import { UserprofileComponent } from './pages/userprofile/userprofile.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'register',
        pathMatch: 'full'
    },
    {
        path: 'register',
        component: RegisterformComponent 
    },
    {
        path: 'login',
        component: LoginformComponent
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'profile/:id',
        component: UserprofileComponent
    }
];
