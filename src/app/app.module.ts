import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth, connectAuthEmulator } from '@angular/fire/auth';
import { provideFirestore, getFirestore, connectFirestoreEmulator } from '@angular/fire/firestore';
// import { provideStorage, getStorage, connectStorageEmulator } from '@angular/fire/storage';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), IonicStorageModule.forRoot(),
     AppRoutingModule, 
     provideFirebaseApp(() => initializeApp(environment.firebase)), 
     provideAuth(() => {
      const auth = getAuth();
      if(environment.useEmulators)
        connectAuthEmulator(auth, 'http://localhost:9099');
      return auth;
    }), 
     provideFirestore(() => {
      const firestore = getFirestore();
      if(environment.useEmulators)
        connectFirestoreEmulator(firestore, 'localhost', 8080);
      return firestore;
    }), 
    //  provideStorage(() => {
    //   const storage = getStorage();
    //   if(environment.useEmulators)
    //     connectStorageEmulator(storage, 'localhost', 9199);
    //   return storage;
    // }),
     FormsModule
    ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
