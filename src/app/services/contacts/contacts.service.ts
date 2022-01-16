import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

export class TODO {
  $key: string;
  title: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})

export class ContactsService {

  constructor(
    private ngFirestore: AngularFirestore,
    private router: Router
  ) { }
  getContacts() {
    try {
      const contactsResponse = this.ngFirestore.collection('contacts').snapshotChanges();
      return contactsResponse;
    } catch (error) {}
  }
}
