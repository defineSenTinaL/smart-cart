import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument, WishlistProduct } from './user.schema';
import { Product, ProductDocument } from 'src/product/product.schema';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}
  private readonly logger = new Logger(UserService.name);

  async createUser(userData: Partial<User>): Promise<User> {
    try {
      const user = new this.userModel(userData);
      this.logger.log(`${userData} User created (User Service)`);
      return user.save();
    } catch (error) {
      this.logger.error(
        `${userData} - ${error} Error Creating User (User Service)`,
      );
      throw new HttpException(
        'Error Creating User',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateUser(
    userId: string,
    updatedUser: any,
  ): Promise<UserDocument | null> {
    try {
      const user = await this.userModel.findById(userId);
      if (!user) {
        this.logger.log(`${userId} User not found (User Service)`);
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      // Update user properties as needed
      if (updatedUser.name) {
        user.name = updatedUser.name;
      }
      if (updatedUser.email) {
        user.email = updatedUser.email;
      }
      if (updatedUser.mobileNumber) {
        user.mobileNumber = updatedUser.mobileNumber;
      }
      // Add more properties to update as needed

      await user.save();

      this.logger.log(`${userId} User updated (User Service)`);

      return user;
    } catch (error) {
      this.logger.error(
        `${error} - ${userId} Error updating user (User Service)`,
      );
      throw new HttpException(
        'Error creating User',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getUserByEmail(email: string): Promise<UserDocument> {
    try {
      // Find the user by email
      let user = await this.userModel.findOne({ email }).exec();

      // If the user doesn't exist, create a new one
      if (!user) {
        // You may want to create the user using a user creation service or method
        // For simplicity, let's assume you have a create user method
        user = new this.userModel({ email });

        // Save the user to the database
        user = await user.save();

        // If user creation fails for some reason, handle it accordingly
        if (!user) {
          this.logger.error(
            `${email} User Creating Failed (User Service - getUserByEmail)`,
          );
          throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
      }

      // Return the found or newly created user
      this.logger.log(`${email} get user data (User Service - getUserByEmail)`);
      return user;
    } catch (error) {
      this.logger.error(
        `${error} - ${email} Error getting user (User Service - getUserByEmail)`,
      );
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  async addAddress(userId: string, newAddress: any): Promise<UserDocument> {
    try {
      const user = await this.userModel.findById(userId);

      if (!user) {
        this.logger.log(`${userId} User not found (User Service - addAdress)`);
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      user.address.push(newAddress);
      await user.save();

      this.logger.log(
        `${userId} User address added (User Service - addAdress)`,
      );
      return user;
    } catch (error) {
      this.logger.error(
        `${error} - ${userId} Error adding user address (User Service - addAdress)`,
      );
      throw new HttpException(
        'Error adding address',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateAddress(
    userId: string,
    addressId: string,
    updatedAddress: any,
  ): Promise<UserDocument> {
    try {
      const user = await this.userModel.findById(userId);
      if (!user) {
        this.logger.log(`${userId} User not found (User Service - addAdress)`);
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      const addressIndex = user.address.findIndex(
        (addr) => addr._id.toString() === addressId,
      );
      if (addressIndex === -1) {
        this.logger.log(
          `${userId} user address not found (User Service - addAdress)`,
        );
        throw new HttpException('address not found', HttpStatus.NOT_FOUND);
      }

      user.address[addressIndex] = updatedAddress; // Update the address
      await user.save();

      this.logger.log(
        `${userId} user address updated (User Service - updateAdress)`,
      );

      return user;
    } catch (error) {
      this.logger.error(
        `${error} - ${userId} Error updating user address (User Service - updateAdress)`,
      );
      throw new HttpException(
        'Error updating address',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteAddress(
    userId: string,
    addressId: string,
  ): Promise<UserDocument> {
    try {
      const user = await this.userModel.findById(userId);
      if (!user) {
        this.logger.log(
          ` ${userId} user not found (User Service - deleteAdress)`,
        );
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      const addressIndex = user.address.findIndex(
        (addr) => addr._id.toString() === addressId,
      );
      if (addressIndex === -1) {
        this.logger.log(
          ` ${userId} user address not found (User Service - deleteAdress)`,
        );
        throw new HttpException('Address not found', HttpStatus.NOT_FOUND);
      }

      user.address.splice(addressIndex, 1); // Remove the address
      await user.save();

      this.logger.log(
        `${userId} user address deleted (User Service - deleteAdress)`,
      );

      return user;
    } catch (error) {
      this.logger.error(
        `${error} - ${userId} Error deleting user address (User Service - deleteAdress)`,
      );
      throw new HttpException(
        'Error deleting address',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getUserWishlist(
    userId: string,
    page: number,
  ): Promise<WishlistProduct[]> {
    const perPage = 10;
    // Validate and sanitize the page and perPage values
    if (page < 1) {
      page = 1;
    }

    // Calculate the skip value based on the page and perPage
    const skip = (page - 1) * perPage;

    try {
      // Find the user by userId and select the wishlist field with pagination options
      const user = await this.userModel
        .findById(userId)
        .select('wishlist')
        .slice('wishlist', [skip, perPage]) // Use slice for pagination
        .exec();

      if (!user) {
        this.logger.log(
          ` ${userId} user not found (User Service - userWishlist)`,
        );
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      // Extract the wishlist array from the user and return it
      const wishlist = user.wishlist;

      this.logger.log(
        `${userId} user got wishlist (User Service - userWishlist)`,
      );

      return wishlist;
    } catch (error) {
      this.logger.error(
        `${error} - ${userId} Error getting wishlist (User Service - deleteAdress)`,
      );
      throw new HttpException(
        'Error getting wishlist',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async toggleCartItem(userId: string, rfid: string): Promise<any> {
    // Find the product by RFID
    const product = await this.productModel.findOne({ rfids: rfid }).exec();
    if (!product) {
      throw new Error('Product not found');
    }

    // Find the user and update the cart
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new Error('User not found');
    }

    const cartProductIndex = user.cart.findIndex((item) =>
      item.productId.equals(product._id),
    );

    if (cartProductIndex !== -1) {
      // Product exists in the cart, check for RFID
      const rfidIndex = user.cart[cartProductIndex].rfids.indexOf(rfid);
      if (rfidIndex !== -1) {
        // RFID exists, remove it
        user.cart[cartProductIndex].rfids.splice(rfidIndex, 1);
        user.cart[cartProductIndex].quantity =
          user.cart[cartProductIndex].rfids.length;
        if (user.cart[cartProductIndex].quantity === 0) {
          // If no RFIDs left, remove the product from the cart
          user.cart.splice(cartProductIndex, 1);
        }
      } else {
        // Add the RFID if it's not already there
        user.cart[cartProductIndex].rfids.push(rfid);
        user.cart[cartProductIndex].quantity =
          user.cart[cartProductIndex].rfids.length;
      }
    } else {
      // Add new product to the cart with the specific RFID
      user.cart.push({ productId: product._id, rfids: [rfid], quantity: 1 });
    }

    await user.save();
    return user.cart;
  }

  async getUserCart(userId: string): Promise<any> {
    const user = await this.userModel
      .findById(userId)
      .populate({
        path: 'cart.productId',
      })
      .exec();
    if (!user) {
      throw new Error('User not found');
    }
    return user.cart;
  }
}
