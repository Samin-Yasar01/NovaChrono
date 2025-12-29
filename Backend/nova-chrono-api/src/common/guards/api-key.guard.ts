import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'];
    // In production, use environment variable: process.env.ADMIN_API_KEY
    // For now we can fallback or just check env.
    return apiKey === process.env.ADMIN_API_KEY;
  }
}
