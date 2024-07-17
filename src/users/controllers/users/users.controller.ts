import { Body, Controller, Get, Post, Req, Res , Param, Query, UsePipes, ValidationPipe, ParseIntPipe, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { AuthGuard } from 'src/users/guards/auth/auth.guard';
import { ValidateCreateUserPipe } from 'src/users/pipes/validate-create-user/validate-create-user.pipe';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {

    constructor(private userService: UsersService){}
    /*
    @Get()
    getUsers(){
        return [{username:"Aastha" , email:"akesarwani950@gmail.com"}];
    }*/

    @Get()
    //@UseGuards(AuthGuard)
    getUsers(){
        return this.userService.fetchUsers;
    }

    

    @Get('posts')
    getUserPosts(){
        return [
            {
                username:"Aastha" , 
                email:"akesarwani950@gmail.com", 
                posts:[
                    {
                        id:1,
                        title:"Post 1"
                    },
                    {
                        id:2,
                        title:"Post 2"
                    }
                ] 
            }
        ]
    }

    @Get('posts/comments')
    getUsersPostsComments(){
        return [
            { 
                id: 1,
                title: 'Post 1',
                comments:[
                    {
                        id:1,
                        title:"comment 1"
                    },
                    {
                        id:2,
                        title:"comment 2"
                    }
                ],
            }
        ]
    }

    @Post('create')
    createUser(@Req() request : Request , @Res() response : Response){
        console.log(request.body);
        response.send("Post created");
    
    }

    @Post('createuser')
    @UsePipes(new ValidationPipe())
    createUser2(@Body(ValidateCreateUserPipe) userData: CreateUserDto ){
       
        console.log(userData);
        //return {};

        return this.userService.createUser(userData);

    }

    @Get(':id/:postId')
    getUserById(@Param('id', ParseIntPipe) id : number  ){
        console.log(id);
        //return {id};
        const user=this.userService.fetchUserById(id);
        if(!user) 
            throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
        return user;

    } 

    @Get(':id/:postId')
    getUserByIdPostId(@Param('id') id : string , @Param('postId') postId : string ){
        console.log(id, postId);
        return {id,postId};
    }

    //using query parameter /users/filter/sortBy=asc
    @Get('filter')
    getUsersByFilter(@Query('sortBy') sortBy : string){
        console.log(sortBy);
    }
}
