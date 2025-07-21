
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      User: {
        Row: {
          id: string;
          email: string;
          // ... agregá más campos si querés
        };
        Insert: {
          id?: string;
          email: string;
        };
        Update: {
          id?: string;
          email?: string;
        };
      };
      Expensas: {
        Row: {
          id: string;
          monto: number;
          // ...
        };
        Insert: {
          id?: string;
          monto: number;
        };
        Update: {
          id?: string;
          monto?: number;
        };
      };
    };
    Views: `unknown`;
    Functions: `unknown`;
  };
}
