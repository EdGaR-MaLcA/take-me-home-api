import { AppNotification } from 'src/shared/application/app.notification';
import { Result } from 'typescript-result';
 
export class OrderDestination {
  private readonly destination: string;
  private static MAX_LENGTH: number = 45;

    private constructor(destination: string) {
    this.destination = destination;
    }

    public getDestination(): string {
    return this.destination;
    }
    
    public static create(destination: string): OrderDestination {
    destination = (destination ?? "").trim();
    return new OrderDestination(destination);
    }

}