import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';

@Injectable()
export class ValidateCreateUserPipe implements PipeTransform {
  transform(value: CreateUserDto, metadata: ArgumentMetadata) {
    console.log("Inside validatecreateUserPipe");
    console.log(value);
    console.log(metadata);

    const parseAgeToInt = parseInt(value.age.toString());
    if(isNaN(parseAgeToInt)){
      console.log(`${value.age} is not a number`);
      throw new HttpException("age is not a number", HttpStatus.BAD_GATEWAY);
    }else{
      return {...value, age:parseAgeToInt};
    }

    return value;
  }
}
