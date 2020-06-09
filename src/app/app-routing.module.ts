import { BookComponent } from './pages/book/book.component';
import { MapsComponent } from './pages/maps/maps.component';
import { HomeComponent } from "./pages/home/home.component";
import { AppLayoutComponent } from "./shared/app-layout/app-layout.component";
import { AuthLayoutComponent } from "./shared/auth-layout/auth-layout.component";
import { LayoutComponent } from "./shared/layout/layout.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./auth/auth.guard";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { SigninComponent } from "./pages/signin/signin.component";
import { TabLayoutComponent } from "./shared/tab-layout/tab-layout.component";
import { UserComponent } from './pages/user/user.component';
import { AccountUsersComponent } from './pages/account-users/account-users.component';
import { TagsComponent } from './pages/tags/tags.component';
import { GenreComponent } from './pages/genre/genre.component';
import { SlideComponent } from './pages/slide/slide.component';
import { SubscribersComponent } from './pages/subscribers/subscribers.component';
import { ProductComponent } from './pages/product/product.component';
import { ClientProfileComponent } from './pages/client-profile/client-profile.component';
import { ClientOverviewComponent } from './pages/client-profile/client-overview/client-overview.component';
import { ClientPaymentComponent } from './pages/client-profile/client-payment/client-payment.component';
import { AboutComponent } from './pages/about/about.component';
import { BookPackageComponent } from './pages/book-package/book-package.component';

const routes: Routes = [
  {
    path: "auth",
    component: AuthLayoutComponent,
    children: [{ path: "", component: SigninComponent }]
  },
  {
    path: "",
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "", component: DashboardComponent },
      { path: "home", component: DashboardComponent },
      {
        path: "client/:id", component: ClientProfileComponent, children: [
          { path: "overview", component: ClientOverviewComponent },
          { path: "payment", component: ClientPaymentComponent },
          { path: "history", component: ClientOverviewComponent },
        ]
      },
    ]
  },
  {
    path: "maps",
    canActivate: [AuthGuard],
    component: TabLayoutComponent,
    children: [
      { path: "", redirectTo: "listing", pathMatch: "full" },
      { path: "listing", component: MapsComponent },
    ]
  },
  {
    path: "app",
    component: AppLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "", redirectTo: "overview", pathMatch: "full" },
      { path: "overview", component: HomeComponent },
      {
        path: "subscribers",
        component: TabLayoutComponent,
        children: [
          { path: "", redirectTo: "approval", pathMatch: "full" },
          { path: ":id", component: SubscribersComponent },
        ]
      },
      // {
      //   path: "packages",
      //   component: TabLayoutComponent,
      //   children: [
      //     { path: "", redirectTo: "data", pathMatch: "full" },
      //     { path: "data", component: ProductComponent },
      //   ]
      // },
      {
        path: "book-packages",
        component: TabLayoutComponent,
        children: [
          { path: "", redirectTo: "data", pathMatch: "full" },
          { path: "data", component: BookPackageComponent },
        ]
      },
      {
        path: "tags",
        component: TabLayoutComponent,
        children: [
          { path: "", redirectTo: "data", pathMatch: "full" },
          { path: "data", component: TagsComponent },
        ]
      },
      {
        path: "about",
        component: AboutComponent,

      },
      {
        path: "slides",
        component: TabLayoutComponent,
        children: [
          { path: "", redirectTo: "data", pathMatch: "full" },
          { path: "data", component: SlideComponent },
        ]
      },
      {
        path: "genres",
        component: TabLayoutComponent,
        children: [
          { path: "", redirectTo: "data", pathMatch: "full" },
          { path: "data", component: GenreComponent },
        ]
      },
      {
        path: "books",
        component: TabLayoutComponent,
        children: [
          { path: "", redirectTo: "data", pathMatch: "full" },
          { path: ":id", component: BookComponent },
        ]
      },
      {
        path: "users",
        component: TabLayoutComponent,
        children: [
          { path: "", redirectTo: "all", pathMatch: "full" },
          { path: "all", component: UserComponent },
        ]
      },
      {
        path: "account-users",
        component: TabLayoutComponent,
        children: [
          { path: "", redirectTo: "all", pathMatch: "full" },
          { path: "all", component: AccountUsersComponent },
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthGuard],
  exports: [RouterModule]
})
export class AppRoutingModule { }
