import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class DataService {
private _storage: Storage | null = null;

  constructor(private storage : Storage) { 
    this.init();
  }

  public async set(key: string, value: string){
    await this.storage.set(key, value);
  }

  public async get(key: string){
    return this.storage.get(key);
  }

  async init(){
    const storage = await this.storage.create();
    this._storage = storage;
  }
}
