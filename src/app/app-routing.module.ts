import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CardComponent } from './card/card.component';
import { CategoryComponent } from './category/category.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { ContentComponent } from './content/content.component';
import { AuthGuard } from './shared/authguard.guard';
import { ProfileComponent } from './profile/profile.component';
import { EditAccountComponent } from './edit-account/edit-account.component';


const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "signup", component: SignupComponent},
  {path: "card", component: CardComponent},
  {path: "category", component: CategoryComponent},
  {path: "createEvent", component: CreateEventComponent},
  { path: 'createEvent/:key', component: CreateEventComponent },
  {path: "createCategory", component: CreateCategoryComponent},
  {path: "createCategory/:key", component: CreateCategoryComponent},
  {path: "content", component: ContentComponent, canActivate: [AuthGuard]},
  {path: "profile", component: ProfileComponent},
  {path: "editAccount", component: EditAccountComponent}
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
