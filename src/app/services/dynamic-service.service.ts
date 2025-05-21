import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DynamicServiceService {

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

 ]

    this.memberShipTypesList=[
      {
        id:1,
        name:"Fixed Desk",
        price:"€350/month",
        description:"Bring your screens and get tucked in. This desk is yours and only yours!"
      },
      {
        id:2,
        name:"Enterprise",
        price:"€1800/month",
        description:"A home for your business or a space to jam with your team? Room for 6!"
      },
      {
        id:3,
        name:"Flex Desk",
        price:"€350/month",
        description:"Need a desk from time to time? Or a central spot to host meetings? We got ya!"
      },
      {
        id:4,
        name:"Meeting Room",
        price:"€150/day",
        description:"In town for a couple of days to meet your remote team? Book for up to 8 pax!"
      },{
        id:5,
        name:"Day Pass",
        price:"€25/day",
        description:"Just you? €25/day gets you a desk and access to all our amenities."
      },{
        id:6,
        name:"Week Pass",
        price:"€140/week",
        description:"Trying out Lisbon? €140 gets you access Monday through Sunday."
      }
    ]
    
   }

  getAllSpaces(){
   return this.spacesTypesList;
  }

  getAllMemberships(){
    return this.memberShipTypesList;
  }

  getAllAminities(){
    return this.aminities;
  }

   
}
