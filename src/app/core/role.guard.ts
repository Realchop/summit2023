import { inject } from "@angular/core";
import { Roles } from "./roles";
import { Auth } from "@angular/fire/auth";

export const RoleGuard = async (requiredRole: Roles) => {
    const auth = inject(Auth);
    const userToken = await auth.currentUser?.getIdTokenResult(false);
    switch(userToken?.claims['role']) {
        case "suma": return Roles.SUMA == requiredRole;
        case "company": return Roles.COMPANY == requiredRole;
        default: return Roles.DELEGATE == requiredRole;
    }
}