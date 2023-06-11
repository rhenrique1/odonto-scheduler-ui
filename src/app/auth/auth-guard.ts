import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { take } from "rxjs";
import { User } from "./user.model";

export const authGuard = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  let currentUser: User;

  authService.currentUser$.pipe(take(1)).subscribe(user => currentUser = user);

  if (currentUser) {
    return true;
  }

  return router.navigateByUrl('/login');
};