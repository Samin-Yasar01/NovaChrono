
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { ApiKeyGuard } from '../../common/guards/api-key.guard';

@Controller('admin')
@UseGuards(ApiKeyGuard)
export class AdminController {
    constructor(private readonly adminService: AdminService) { }

    @Get('dashboard')
    getDashboardStats() {
        return this.adminService.getDashboardStats();
    }
}
