'use server';

import { serverApiCall } from '../../actions/api-action';
import { Api_path } from '../../constant/api';
import nodemailer from 'nodemailer';

export const createOrder = async (orderData: any) => {
    // Prepare data for API call (remove name from items as backend doesn't expect it)
    const apiOrderData = {
        ...orderData,
        items: orderData.items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price
        }))
    };

    const result = await serverApiCall(Api_path.ORDERS.CREATE, 'POST', apiOrderData);

    // Send email notifications
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Business notification email
        const businessMailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: 'New Order Placed - NovaChrono',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f4f4f4; padding: 20px;">
                    <div style="background-color: #1a1a1a; color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                        <h1 style="margin: 0; color: #d4af37;">NovaChrono</h1>
                        <h2 style="margin: 10px 0; color: #ffffff;">New Order Received</h2>
                    </div>

                    <div style="background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                        <h3 style="color: #333; border-bottom: 2px solid #d4af37; padding-bottom: 10px;">Customer Information</h3>
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 8px 0; font-weight: bold; color: #555;">Order ID:</td>
                                <td style="padding: 8px 0; color: #d4af37; font-weight: bold;">#${result.id || result._id}</td>
                            </tr>
                            <tr style="background-color: #f9f9f9;">
                                <td style="padding: 8px 0; font-weight: bold; color: #555;">Name:</td>
                                <td style="padding: 8px 0; color: #333;">${orderData.customerName}</td>
                            </tr>
                            <tr style="background-color: #f9f9f9;">
                                <td style="padding: 8px 0; font-weight: bold; color: #555;">Phone:</td>
                                <td style="padding: 8px 0; color: #333;">${orderData.phone}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td>
                                <td style="padding: 8px 0; color: #333;">${orderData.email}</td>
                            </tr>
                            <tr style="background-color: #f9f9f9;">
                                <td style="padding: 8px 0; font-weight: bold; color: #555;">Address:</td>
                                <td style="padding: 8px 0; color: #333;">${orderData.address}</td>
                            </tr>
                        </table>

                        <h3 style="color: #333; border-bottom: 2px solid #d4af37; padding-bottom: 10px; margin-top: 30px;">Order Items</h3>

                        <!-- Desktop Table (hidden on mobile) -->
                        <div class="table-container" style="display: block; overflow-x: auto;">
                            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; min-width: 500px;">
                                <thead>
                                    <tr style="background-color: #1a1a1a; color: white;">
                                        <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Product</th>
                                        <th style="padding: 12px; text-align: center; border: 1px solid #ddd;">Qty</th>
                                        <th style="padding: 12px; text-align: right; border: 1px solid #ddd;">Price</th>
                                        <th style="padding: 12px; text-align: right; border: 1px solid #ddd;">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${orderData.items.map((item: any, index: number) => `
                                        <tr style="background-color: ${index % 2 === 0 ? '#f9f9f9' : 'white'};">
                                            <td style="padding: 12px; border: 1px solid #ddd; color: #333;">${item.name}</td>
                                            <td style="padding: 12px; text-align: center; border: 1px solid #ddd; color: #333;">${item.quantity}</td>
                                            <td style="padding: 12px; text-align: right; border: 1px solid #ddd; color: #333;">$${item.price.toFixed(2)}</td>
                                            <td style="padding: 12px; text-align: right; border: 1px solid #ddd; color: #333; font-weight: bold;">$${(item.price * item.quantity).toFixed(2)}</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>

                        <!-- Mobile Card Layout (hidden on desktop) -->
                        <div class="mobile-cards" style="display: none;">
                            ${orderData.items.map((item: any, index: number) => `
                                <div style="background-color: ${index % 2 === 0 ? '#f9f9f9' : 'white'}; border: 1px solid #ddd; border-radius: 8px; padding: 15px; margin-bottom: 10px;">
                                    <div style="font-weight: bold; color: #333; margin-bottom: 8px;">${item.name}</div>
                                    <div style="display: flex; justify-content: space-between; align-items: center;">
                                        <span style="color: #666;">Qty: ${item.quantity}</span>
                                        <span style="color: #666;">Price: $${item.price.toFixed(2)}</span>
                                        <span style="font-weight: bold; color: #d4af37;">$${(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                </div>
                            `).join('')}
                        </div>

                        <div style="background-color: #d4af37; color: white; padding: 15px; border-radius: 8px; text-align: center; font-size: 18px; font-weight: bold;">
                            Total Amount: $${orderData.totalAmount.toFixed(2)}
                        </div>
                    </div>

                    <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
                        <p>This is an automated notification from NovaChrono. Please process this order promptly.</p>
                    </div>
                </div>

                <style>
                    @media (max-width: 600px) {
                        .table-container { display: none !important; }
                        .mobile-cards { display: block !important; }
                    }
                </style>
            `,
        };

        // Customer confirmation email
        const customerMailOptions = {
            from: process.env.EMAIL_USER,
            to: orderData.email,
            subject: 'Order Confirmation - NovaChrono',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f4f4f4; padding: 20px;">
                    <div style="background-color: #1a1a1a; color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                        <h1 style="margin: 0; color: #d4af37;">NovaChrono</h1>
                        <h2 style="margin: 10px 0; color: #ffffff;">Thank You for Your Order!</h2>
                        <p style="margin: 10px 0; color: #cccccc;">Your order has been successfully placed and is being processed.</p>
                    </div>

                    <div style="background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                        <h3 style="color: #333; border-bottom: 2px solid #d4af37; padding-bottom: 10px;">Order Summary</h3>
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 8px 0; font-weight: bold; color: #555;">Order ID:</td>
                                <td style="padding: 8px 0; color: #d4af37; font-weight: bold;">#${result.id || result._id}</td>
                            </tr>
                            <tr style="background-color: #f9f9f9;">
                                <td style="padding: 8px 0; font-weight: bold; color: #555;">Order Date:</td>
                                <td style="padding: 8px 0; color: #333;">${new Date().toLocaleDateString()}</td>
                            </tr>
                            <tr style="background-color: #f9f9f9;">
                                <td style="padding: 8px 0; font-weight: bold; color: #555;">Customer:</td>
                                <td style="padding: 8px 0; color: #333;">${orderData.customerName}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; font-weight: bold; color: #555;">Shipping Address:</td>
                                <td style="padding: 8px 0; color: #333;">${orderData.address}</td>
                            </tr>
                        </table>

                        <h3 style="color: #333; border-bottom: 2px solid #d4af37; padding-bottom: 10px; margin-top: 30px;">Your Items</h3>

                        <!-- Desktop Table (hidden on mobile) -->
                        <div class="table-container" style="display: block; overflow-x: auto;">
                            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; min-width: 500px;">
                                <thead>
                                    <tr style="background-color: #1a1a1a; color: white;">
                                        <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Product</th>
                                        <th style="padding: 12px; text-align: center; border: 1px solid #ddd;">Qty</th>
                                        <th style="padding: 12px; text-align: right; border: 1px solid #ddd;">Price</th>
                                        <th style="padding: 12px; text-align: right; border: 1px solid #ddd;">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${orderData.items.map((item: any, index: number) => `
                                        <tr style="background-color: ${index % 2 === 0 ? '#f9f9f9' : 'white'};">
                                            <td style="padding: 12px; border: 1px solid #ddd; color: #333;">${item.name}</td>
                                            <td style="padding: 12px; text-align: center; border: 1px solid #ddd; color: #333;">${item.quantity}</td>
                                            <td style="padding: 12px; text-align: right; border: 1px solid #ddd; color: #333;">$${item.price.toFixed(2)}</td>
                                            <td style="padding: 12px; text-align: right; border: 1px solid #ddd; color: #333; font-weight: bold;">$${(item.price * item.quantity).toFixed(2)}</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>

                        <!-- Mobile Card Layout (hidden on desktop) -->
                        <div class="mobile-cards" style="display: none;">
                            ${orderData.items.map((item: any, index: number) => `
                                <div style="background-color: ${index % 2 === 0 ? '#f9f9f9' : 'white'}; border: 1px solid #ddd; border-radius: 8px; padding: 15px; margin-bottom: 10px;">
                                    <div style="font-weight: bold; color: #333; margin-bottom: 8px;">${item.name}</div>
                                    <div style="display: flex; justify-content: space-between; align-items: center;">
                                        <span style="color: #666;">Qty: ${item.quantity}</span>
                                        <span style="color: #666;">Price: $${item.price.toFixed(2)}</span>
                                        <span style="font-weight: bold; color: #d4af37;">$${(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                </div>
                            `).join('')}
                        </div>

                        <div style="background-color: #d4af37; color: white; padding: 15px; border-radius: 8px; text-align: center; font-size: 18px; font-weight: bold;">
                            Total Amount: $${orderData.totalAmount.toFixed(2)}
                        </div>

                        <div style="margin-top: 20px; padding: 15px; background-color: #f0f0f0; border-radius: 8px;">
                            <h4 style="margin: 0 0 10px 0; color: #333;">What's Next?</h4>
                            <ul style="color: #555; margin: 0; padding-left: 20px;">
                                <li>We'll process your order within 1-2 business days</li>
                                <li>You'll receive shipping updates via email</li>
                                <li>Questions? Contact us at ${process.env.EMAIL_USER}</li>
                            </ul>
                        </div>
                    </div>

                    <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
                        <p>Thank you for shopping with NovaChrono! We appreciate your business.</p>
                        <p>This is an automated confirmation email. Please do not reply to this message.</p>
                    </div>
                </div>

                <style>
                    @media (max-width: 600px) {
                        .table-container { display: none !important; }
                        .mobile-cards { display: block !important; }
                    }
                </style>
            `,
        };

        // Send both emails
        await transporter.sendMail(businessMailOptions);
        await transporter.sendMail(customerMailOptions);
    } catch (error) {
        console.error('Failed to send email:', error);
        // Don't throw error to avoid breaking the order creation
    }

    return result;
};

export const getOrders = async () => {
    return await serverApiCall(Api_path.ORDERS.LIST);
};

export const updateOrderStatus = async (id: string, status: string) => {
    return await serverApiCall(Api_path.ORDERS.UPDATE(id), 'PATCH', { status });
};
