import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage | null = null;
  private ready: boolean = false;

  constructor(private storage: Storage) {}

  async init() {
    const storage = await this.storage.create();
    this.ready = true;
    this._storage = storage;
  }

  private async set(key: string, value: any): Promise<void> {
    if(!this.ready) await this.init(); // This cannot be moved to the constructor due to some 
    this._storage?.set(key, value);    // unfortunate race conditions in angulars implementation
  }

  private async get(key: string): Promise<any> {
    if(!this.ready) await this.init();
    return await this._storage?.get(key);
  }

  private async remove(key: string): Promise<void> {
    if(!this.ready) await this.init();
    this._storage?.remove(key);
  }

  public async clear(): Promise<void> {
    if(!this.ready) await this.init();
    this._storage?.clear();
  }

  public saveLogin(email: string, password: string): void {
    this.set("credentials", JSON.stringify({email: email, password: password}));
  }

  public async getSavedLogin(): Promise<{email: string, password: string} | null> {
    return JSON.parse(await this.get("credentials"))
  }

  public async saveUsers(value: any): Promise<void> {
    this.set("users", JSON.stringify(value));
  }

  public async getSavedUsers(): Promise<any> {
    return JSON.parse(await this.get("users"));
  }
}
