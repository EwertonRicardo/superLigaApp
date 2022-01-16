import { Component, OnInit } from '@angular/core';
import { ContactsService } from './../../services/contacts/contacts.service';

export class CONTACT {
  type: string;
  icon: string;
  contact: string;
}
@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  contacts: CONTACT[];

  constructor(private contactsService: ContactsService) { }

  ngOnInit() {
    this.contactsService.getContacts().subscribe((res) => {
      this.contacts = res.map((t) => ({
          id: t.payload.doc.id,
          ...t.payload.doc.data() as CONTACT
        }));
        console.log(this.contacts);
    });
  }

}
