import { inject } from "@angular/core";
import { StorageService } from "../services/storage.service";
import { Auth } from "@angular/fire/auth";

export const LogoutGuard = async () => {
    const ss = inject(StorageService);
    const auth = inject(Auth);
    await ss.clear();
    await auth.signOut();
    window.location.replace("/");
}