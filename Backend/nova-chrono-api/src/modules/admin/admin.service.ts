import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../products/products.schema';
import { Order } from '../orders/orders.schema';
import { Category } from '../categories/categories.schema';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async getDashboardStats() {
    const totalProducts = await this.productModel.countDocuments();
    const totalOrders = await this.orderModel.countDocuments();
    const totalCategories = await this.categoryModel.countDocuments();

    // Calculate total revenue
    const revenueResult = await this.orderModel.aggregate([
      { $match: { status: { $ne: 'cancelled' } } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } },
    ]);
    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;

    const recentOrders = await this.orderModel
      .find()
      .sort({ createdAt: -1 })
      .limit(5);

    return {
      totalProducts,
      totalOrders,
      totalCategories,
      totalRevenue,
      recentOrders,
    };
  }
}
