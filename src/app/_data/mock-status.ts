import { Status } from './models/status';

// Mock serviceStatus data, those with "resolved": false get filtered out and displayed in the BroadbandComponent//PhoneComponent's HTML
// templates. It in JSON format event though it currently lives in a TypeScript file. This should allow seamless switchover for the app
// to receieve JSON data asynchronously as and when that might happen!
export const STATUS: Status[] = [{
  "broadband": [
    {
      "type": "Service Outage",
      "date": "2017-10-11T16:48",
      "details": "blah",
      "status": {
        "resolved": true,
        "date": null
      }
    },
    {
      "type": "Website Maintenance",
      "date": "2017-10-08T02:00",
      "details": "blah",
      "status": {
        "resolved": true,
        "date": "2017-10-09T04:00"
      }
    },
    {
      "type": "Fault Checker Maintenance",
      "date": "2017-10-03T10:14",
      "details": "blah",
      "status": {
        "resolved": true,
        "date": "2017-10-03T13:29"
      }
    }
  ],
  "phone": [
    {
      "type": "Service Outage",
      "date": "2017-12-11T16:48",
      "details": "A service outage was reported that is affecting the South Yorkshire region. It seems to have been caused by the telephone pylons becoming frozen and brittle, making their structural support shatter and bringing the whole lot down.",
      "status": {
        "resolved": false,
        "date": null
      }
    },
    {
      "type": "Network Down",
      "date": "2017-12-08T09:07",
      "details": "The entire network is down in Somerset due to some technical difficulties BT are experiencing. It appears that a renegade family of badgers have dug up the cables and proceeded to dine on them, causing widespread panic.",
      "status": {
        "resolved": false,
        "date": null
      }
    }
  ],
  "tv": [

  ],
  "mobile": [

  ],
  "email": [

  ],
  "account": [

  ]
}];
