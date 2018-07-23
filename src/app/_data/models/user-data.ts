export class UserData {
    id: number;
    account: object;
    billing: object;
    broadband?: any;
    phone?: any;
    mobile?: any;
    tv?: any;
}

interface Account {
  username: string;
  name: Name[];
  gender: string;
  email: string;
  security?: Security[];
  contact?: Contact[];
}

interface Name {
  first: string;
  surname: string;
}

interface Security {
  question: string;
  answer: string;
}

interface Contact {
  phone?: boolean;
  email?: boolean;
  text?: boolean;
  socialMedia?: boolean;
}
