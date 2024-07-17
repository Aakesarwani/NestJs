import { Injectable } from '@nestjs/common';
import { CreateUserType } from 'src/utils/types';

@Injectable()
export class UsersService {
    private fakeUsers=[{username:"aastha" , email:"akesarwani950@gmail.com"}];
    fetchUsers(){
        return this.fakeUsers;
    }
    createUser(userDetails: CreateUserType){
        this.fakeUsers.push(userDetails);
        return;
    }
    fetchUserById(id:number){
        //return {id:1,username:"aastha", email:"akesarwani950@gmail.com"};
        return null;
    }
}
