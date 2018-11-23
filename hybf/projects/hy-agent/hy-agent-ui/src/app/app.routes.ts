import { LoginComponent } from "./login/login.component";
import { AuthGuard } from "./common/auth.guard";

export const appRoutes = [
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: './component/layout.module#LayoutModule'
  },
  { path: "login", component: LoginComponent }
];
