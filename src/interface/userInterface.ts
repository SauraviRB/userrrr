export interface InputUserInterface {
    username: string;
    email: string;
    password: string;
  }
  
  export interface UserInterface extends InputUserInterface {
    id: number;
  }

 