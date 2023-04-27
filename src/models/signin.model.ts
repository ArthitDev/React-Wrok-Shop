import { User } from "./user.model";

export interface Signin {
    success:    boolean;
    acessToken: string;
    user:       User;
}