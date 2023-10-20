import { inject } from "@angular/core";
import { Auth } from "@angular/fire/auth";
import { Router } from "@angular/router";

export const TimeGuard = async () => {
    const router = inject(Router);
    const auth = inject(Auth);
    const userToken = await auth.currentUser?.getIdTokenResult(false);
    if(new Date().getDate() >= 26 || userToken?.claims['role'] == 'suma')
        return Promise<true>;
    return router.navigate(['main', 'news'])
}