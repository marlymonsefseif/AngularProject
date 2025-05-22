import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StaticServiceService {

  spacesTypesList:any;
  memberShipTypesList:any;
  aminities:any;

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

    
     this.aminities=[
     { 
        id: 1, 
        name: 'High-Speed WiFi', 
        description: 'Ultra-fast internet connection',
        icon: 'wifi'
      },
      { 
        id: 2, 
        name: 'Premium Coffee', 
        description: 'High quality coffee & tea',
        icon: 'coffee'
      },
      { 
        id: 3, 
        name: 'Printing Services', 
        description: 'Color & B/W printing',
        icon: 'print'
      },
      { 
        id: 4, 
        name: 'Meeting Rooms', 
        description: 'Fully equipped spaces',
        icon: 'users'
      },
      { 
        id: 5, 
        name: 'Parking Space', 
        description: 'Secure parking area',
        icon: 'parking'
     },
      { 
        id: 6, 
        name: '24/7 Access', 
        description: 'Work anytime you want',
        icon: 'clock'
      }

    ];
 }

  getAllSpaces(){
   return this.spacesTypesList;
  }


  getAllAminities(){
    return this.aminities;
  }

   
}
