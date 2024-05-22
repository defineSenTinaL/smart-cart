// order.controller.ts

import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDocument } from './order.schema';
import {
  CancellationDataDTO,
  PaymentResponseDTO,
} from './dto/create-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(
    @Body() orderData: Partial<OrderDocument>,
  ): Promise<OrderDocument | PaymentResponseDTO | null> {
    const res = await this.orderService.createOrder(orderData);
    return res;
  }

  @Get('orders/:userId')
  async getUserOrders(
    @Param('userId') userId: string,
    @Query('page') page: number,
  ) {
    return this.orderService.getUserOrders(userId, page);
  }

  @Get(':id')
  async getOrderById(@Param('id') _id: string): Promise<OrderDocument | null> {
    return this.orderService.getOrderById(_id);
  }

  // @Post('trigger-email/:id')
  // @HttpCode(HttpStatus.ACCEPTED)
  // async triggerEmailProcessing(@Param('id') orderId: string) {
  //   const res = await this.orderService.triggerEmailProcessing(orderId);
  //   return { res, message: 'Email processing triggered for order' };
  // }

  @Patch('cancel/:id')
  async requestOrderCancellation(
    @Param('id') orderId: string,
    @Body() data: CancellationDataDTO,
  ) {
    await this.orderService.requestOrderCancellation(orderId, data);

    return {
      status: 200,
      message: 'Order cancellation request submitted successfully',
    };
  }
}
