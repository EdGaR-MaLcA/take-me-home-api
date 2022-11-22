import { AppNotification } from 'src/shared/application/app.notification';
import { Result } from 'typescript-result';
 
export class OrderOrigin {
  private readonly origin: string;
  private static MAX_LENGTH: number = 45;

    private constructor(origin: string) {
    this.origin = origin;
    }

    public getOrigin(): string {
    return this.origin;
    }
    
    public static create(origin: string): OrderOrigin {
    origin = (origin ?? "").trim();
    return new OrderOrigin(origin);
    }

}