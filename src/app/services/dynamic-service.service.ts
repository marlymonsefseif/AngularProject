import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DynamicServiceService {

  spacesTypesList:any;
  memberShipTypesList:any;

  constructor() {

      this.spacesTypesList=[
      {
        id:1,
        name:"Private office",
        image:"po.jpg"
      },
      {
        id:2,
        name:"Shared offices",
        image:"so.jpg"
      },
      {
        id:3,
        name:"Event Spaces",
        image:"er.avif"
      },
      {
        id:4,
        name:"Meeting Rooms",
        image:"mr.avif"
      }
    ];

    
    this.memberShipTypesList=[
      {
        
      },
      {

      },
      {

      }
    ]
   }

  getAllSpaces(){
   return this.spacesTypesList;
  }


   
}
