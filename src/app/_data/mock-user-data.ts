import { UserData } from './models/user-data';

// Mock userData, which are referenced using {{interpolation}} in the component templates. It's in JSON format event though it currently
// lives in a TypeScript file. This should allow seamless switchover for the app to receieve JSON data asynchronously as and when that
// might happen! See line 15 of UserDataService for how to use an Observable (which is kinda like an NG-specific supercharged Promise) 
// to fetch JSON data and use in the app. The data file is very old FYI!
export const USERDATA: UserData[] = [
  {
    "id": 224401,
    "account": {
      "username": "fredp",
      "name": {
        "first": "Fred",
        "surname": "Pritchard"
      },
      "gender": "male",
      "email": {
        "primary": "fred.pritchard@plus.net"
      },
      "mobile": "+447739428379",
      "security": {
        "question": "Name of first pet",
        "answer": "Sprinkles"
      },
      "contact": {
        "phone": false,
        "email": true,
        "text": false,
        "social": false
      }
    },
    "billing": {
      "startDate": "2016-09-22",
      "endDate": "2018-03-22",
      "paymentMethod": "Direct Debit",
      "frequency": "Monthly",
      "bills": [
        {
          "id": 1,
          "date": "2016-10-22",
          "amount": 20.88,
          "charges": 1.36,
          "total": 22.24,
          "paid": true
        },
        {
          "id": 2,
          "date": "2016-11-22",
          "amount": 20.88,
          "charges": 0,
          "total": 20.88,
          "paid": true
        },
        {
          "id": 3,
          "date": "2016-12-22",
          "amount": 20.88,
          "charges": 2.87,
          "total": 23.75,
          "paid": true
        },
        {
          "id": 4,
          "date": "2017-01-22",
          "amount": 20.88,
          "charges": 6.51,
          "total": 27.39,
          "paid": true
        },
        {
          "id": 5,
          "date": "2017-02-22",
          "amount": 20.88,
          "charges": 0,
          "total": 20.88,
          "paid": true
        },
        {
          "id": 6,
          "date": "2017-03-22",
          "amount": 20.88,
          "charges": 0,
          "total": 20.88,
          "paid": true
        },
        {
          "id": 7,
          "date": "2017-04-22",
          "amount": 20.88,
          "charges": 1.22,
          "total": 22.10,
          "paid": true
        },
        {
          "id": 8,
          "date": "2017-05-22",
          "amount": 20.88,
          "charges": 0,
          "total": 20.88,
          "paid": true
        },
        {
          "id": 9,
          "date": "2017-06-22",
          "amount": 20.88,
          "charges": 0,
          "total": 20.88,
          "paid": true
        },
        {
          "id": 10,
          "date": "2017-07-22",
          "amount": 20.88,
          "charges": 0.36,
          "total": 21.24,
          "paid": true
        },
        {
          "id": 11,
          "date": "2017-08-22",
          "amount": 20.88,
          "charges": 2.90,
          "total": 23.78,
          "paid": true
        },
        {
          "id": 12,
          "date": "2017-09-22",
          "amount": 20.88,
          "charges": 0,
          "total": 20.88,
          "paid": true
        },
        {
          "id": 13,
          "date": "2017-10-22",
          "amount": 33.98,
          "charges": 0,
          "total": 33.98,
          "paid": false
        }
      ]
    },
    "broadband": {
      "contract": {
        "package": "Unlimited Fibre",
        "contract": "18",
        "monthlyPrice": {
          "first12": 20.88,
          "second6": 33.98
        }
      },
      "details": {
        "phoneNumber": "+441142439782",
        "address": {
          "houseNameNo": "44",
          "road": "South View Cres",
          "city": "Sheffield",
          "county": "South Yorkshire",
          "postcode": "S7 1DJ"
        }
      }
    },
    "phone": false,
    "tv": {
      "contract": {
        "package": "YouView+"
      }
    },
    "mobile": {
      "contract": {
        "package": "4GB Unlimited",
        "contract": "24"
      }
    }
  },
  {
    "id": 224402,
    "account": {
      "username": "margaretd",
      "name": {
        "first": "Margaret",
        "surname": "Doran"
      },
      "gender": "female",
      "email": {
        "primary": "margaret.doran@plus.net"
      },
      "mobile": "+447276914455",
      "security": {
        "question": "Favourite food",
        "answer": "Pizza"
      },
      "contact": {
        "phone": true,
        "email": false,
        "text": true,
        "social": true
      }
    },
    "billing": {
      "startDate": "2016-09-22",
      "endDate": "2018-03-22",
      "paymentMethod": "Direct Debit",
      "frequency": "Monthly",
      "bills": [
        {
          "id": 1,
          "date": "2016-10-22",
          "amount": 20.88,
          "charges": 1.36,
          "total": 22.24,
          "paid": true
        },
        {
          "id": 2,
          "date": "2016-11-22",
          "amount": 20.88,
          "charges": 0,
          "total": 20.88,
          "paid": true
        },
        {
          "id": 3,
          "date": "2016-12-22",
          "amount": 20.88,
          "charges": 2.87,
          "total": 23.75,
          "paid": true
        },
        {
          "id": 4,
          "date": "2017-01-22",
          "amount": 20.88,
          "charges": 6.51,
          "total": 27.39,
          "paid": true
        },
        {
          "id": 5,
          "date": "2017-02-22",
          "amount": 20.88,
          "charges": 0,
          "total": 20.88,
          "paid": true
        },
        {
          "id": 6,
          "date": "2017-03-22",
          "amount": 20.88,
          "charges": 0,
          "total": 20.88,
          "paid": true
        },
        {
          "id": 7,
          "date": "2017-04-22",
          "amount": 20.88,
          "charges": 1.22,
          "total": 22.10,
          "paid": true
        },
        {
          "id": 8,
          "date": "2017-05-22",
          "amount": 20.88,
          "charges": 0,
          "total": 20.88,
          "paid": true
        },
        {
          "id": 9,
          "date": "2017-06-22",
          "amount": 20.88,
          "charges": 0,
          "total": 20.88,
          "paid": true
        },
        {
          "id": 10,
          "date": "2017-07-22",
          "amount": 20.88,
          "charges": 0.36,
          "total": 21.24,
          "paid": true
        },
        {
          "id": 11,
          "date": "2017-08-22",
          "amount": 20.88,
          "charges": 2.90,
          "total": 23.78,
          "paid": true
        },
        {
          "id": 12,
          "date": "2017-09-22",
          "amount": 20.88,
          "charges": 0,
          "total": 20.88,
          "paid": true
        },
        {
          "id": 13,
          "date": "2017-10-22",
          "amount": 33.98,
          "charges": 0,
          "total": 33.98,
          "paid": false
        }
      ]
    },
    "broadband": {
      "contract": {
        "package": "Unlimited Fibre Extra",
        "contract": "18",
        "monthlyPrice": {
          "first12": 22.49,
          "second6": 33.98
        }
      },
      "details": {
        "phoneNumber": "+441140653542",
        "address": {
          "houseNameNo": "56",
          "road": "Harold Avenue",
          "city": "Leeds",
          "county": "West Yorkshire",
          "postcode": "LS6 1EK"
        }
      }
    },
    "phone": {
      "contract": {
        "package": "Line only",
        "credit": {
          "limit": 75,
          "used": 55
        },
        "minutes": {
          "limit": 300,
          "used": 120
        }
      },
      "calls": [
        {
          "id": 1,
          "destination": "+447739468309",
          "time": "2017-09-22T23:01:00",
          "length": "0.22",
          "cost": 0.00
        },
        {
          "id": 2,
          "destination": "+441629813009",
          "time": "2017-09-26T09:27:00",
          "length": "1.04",
          "cost": 0.02
        },
        {
          "id": 3,
          "destination": "+447518716290",
          "time": "2017-09-26T17:34:00",
          "length": "3.22",
          "cost": 0.67
        },
        {
          "id": 4,
          "destination": "+447817610981",
          "time": "2017-09-27T10:45:00",
          "length": "15.48",
          "cost": 0.00
        },
        {
          "id": 5,
          "destination": "+441143128941",
          "time": "2017-09-30T19:54:00",
          "length": "11.50",
          "cost": 1.56
        },
        {
          "id": 6,
          "destination": "+441618718877",
          "time": "2017-10-04T20:17:00",
          "length": "0.04",
          "cost": 0.06
        }
      ],
      "addOns": [
        {
          "name": "Voicemail",
          "status": "Active"
        },
        {
          "name": "Call divert",
          "status": "Pending"
        },
        {
          "name": "Ring back",
          "status": "Pending"
        },
        {
          "name": "Reminder call",
          "status": "Removal pending"
        }
      ]
    },
    "tv": false,
    "mobile": false
  }
];
