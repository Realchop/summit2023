import { inject } from "@angular/core";
import { Auth } from "@angular/fire/auth";

export const TimeGuard = async () => {
    const auth = inject(Auth);
    const userToken = await auth.currentUser?.getIdTokenResult(false);
    return userToken?.claims['role'] == 'suma' || new Date().getDay() >= 26
}