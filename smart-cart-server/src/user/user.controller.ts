import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Put,
  Delete,
  Req,
  Query,
  Logger,
  HttpException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDocument } from './user.schema';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  private readonly logger = new Logger(UserController.name);

  @Get(':id')
  async getUserByEmail(@Param('id') email: string): Promise<UserDocument> {
    try {
      const user = await this.userService.getUserByEmail(email);
      this.logger.log(
        `${email} got user data (User Controller - getUserByEmail)`,
      );
      return user;
    } catch (error) {
      this.logger.error(
        `${error} - ${email} User not found or server Error (User Controller - getUserByEmail)`,
      );
      throw new HttpException(
        'User not found or server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('cart/:userId')
  async getCart(@Param('userId') userId: string) {
    try {
      const cart = await this.userService.getUserCart(userId);
      return {
        statusCode: HttpStatus.OK,
        message: 'Cart retrieved successfully',
        data: cart,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: error.message,
          data: null,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Post('id')
  async createUser(@Req() req: any, @Body() userData: Partial<UserDocument>) {
    try {
      const user = this.userService.createUser(userData);
      this.logger.log(`User Created (User Controller)`);
      return user;
    } catch (error) {
      this.logger.error(
        `${error} -${req.user} server Error or error creating user (User Controller)`,
      );
      throw new HttpException(
        'Server Error or error creating user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id') // You can use @Put if you prefer PUT requests for update
  async updateUser(
    @Param('id') userId: string,
    @Body() updatedUser: any,
  ): Promise<UserDocument | null> {
    try {
      const user = await this.userService.updateUser(userId, updatedUser);
      this.logger.log(`${userId} User updated (User Controller)`);
      return user;
    } catch (error) {
      this.logger.error(
        `${error} - ${userId} User not found or server Error or error updating user (User Controller)`,
      );
      throw new HttpException(
        'User not found or server Error or error updating user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('address/:userId')
  async addAddress(
    @Param('userId') userId: string,
    @Body() newAddress: any,
  ): Promise<UserDocument> {
    try {
      const user = await this.userService.addAddress(userId, newAddress);
      this.logger.log(
        `${userId} User address added (User Controller - addAdress)`,
      );
      return user;
    } catch (error) {
      this.logger.error(
        `${error} - ${userId} User not found or server Error (User Controller - addAdress)`,
      );
      throw new HttpException(
        'User not found or Database Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put('address/:userId/:addressId')
  async updateAddress(
    @Param('userId') userId: string,
    @Param('addressId') addressId: string,
    @Body() updatedAddress: any,
  ): Promise<UserDocument> {
    try {
      const user = await this.userService.updateAddress(
        userId,
        addressId,
        updatedAddress,
      );

      this.logger.log(
        `${userId} user address updated (User Controller - updateAddress)`,
      );
      return user;
    } catch (error) {
      this.logger.error(
        `${error} - ${userId} user address not found or user not found or server issue (User Controller - updateAddress)`,
      );
      throw new HttpException(
        'user address not found or user not found or server issue',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('address/:userId/:addressId')
  async deleteAddress(
    @Param('userId') userId: string,
    @Param('addressId') addressId: string,
  ): Promise<UserDocument> {
    try {
      const user = await this.userService.deleteAddress(userId, addressId);

      this.logger.log(
        `${userId} user address deleted (User Controller - deleteAddress)`,
      );

      return user;
    } catch (error) {
      this.logger.error(
        `${error} - ${userId} user address not found or user not found or server issue (User Controller - deleteAddress)`,
      );
      throw new HttpException(
        'user address not found or user not found or server issue',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('wishlist/:userId')
  async getUserWishlist(
    @Param('userId') userId: string,
    @Query('page') page: number,
  ) {
    try {
      const wishlist = await this.userService.getUserWishlist(userId, page);
      this.logger.log(
        `${userId} user got wishlist (User Controller - userWishlist)`,
      );
      return wishlist;
    } catch (error) {
      this.logger.error(
        `${error} - ${userId} error getting wishlist or user not found or server issue (User Controller - userWishlist)`,
      );
      throw new HttpException(
        'error getting wishlist or user not found or server issue',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('cart/add/:userId/:rfid')
  @HttpCode(HttpStatus.OK)
  async toggleCartItem(
    @Param('userId') userId: string,
    @Param('rfid') rfid: string,
  ) {
    try {
      const cart = await this.userService.toggleCartItem(userId, rfid);
      return {
        statusCode: HttpStatus.OK,
        message: 'Product added to cart successfully',
        data: cart,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: error.message,
        data: null,
      };
    }
  }
}
