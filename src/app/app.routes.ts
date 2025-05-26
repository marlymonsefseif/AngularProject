import { Routes } from '@angular/router';
import { RegisterformComponent } from './pages/registerform/registerform.component';
import { LoginformComponent } from './pages/loginform/loginform.component';
import { HomeComponent } from './pages/home/home.component';
import { UserprofileComponent } from './pages/userprofile/userprofile.component';
import { AddAmenityComponent } from './components/add-amenity/add-amenity.component';
import { AddSpaceComponent } from './components/add-space/add-space.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { ContactComponent } from './pages/Contact/contact.component';
import { SpacesComponent } from './components/spaces/spaces.component';
import { SpaceDetailsComponent } from './pages/space-details/space-details.component';
import { AboutComponent } from './pages/about/about.component';
import { UsersComponent } from './components/users/users.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'register',
        component: RegisterformComponent
    },
    {
        path: 'contact',
        component: ContactComponent 
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
    },
    {
        path: 'admin-dashboard',
        component: AdminDashboardComponent,
        children: [
            {
                path: '',
                component: AddSpaceComponent
            },
            {
                path: 'add-amenity',
                component: AddAmenityComponent
            },
            {
                path: 'add-gallery',
                component: GalleryComponent
            },
            {
                path: "users",
                component: UsersComponent
            }
        ]
    },
    {
        path: 'spaces',
        component: SpacesComponent
    },
    {
        path: 'spaces/:id',
        component: SpaceDetailsComponent
    },
    {
        path: 'about',
        component: AboutComponent
    }
];
