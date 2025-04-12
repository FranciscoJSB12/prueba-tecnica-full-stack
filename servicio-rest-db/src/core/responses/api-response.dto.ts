import { Expose, Type } from 'class-transformer';

export class ApiResponse<T> {
  @Expose()
  success: boolean;

  @Expose()
  message: string;

  @Expose()
  @Type(() => Object)
  data: T;

  @Expose()
  timestamp: string;

  private constructor(partial: Partial<ApiResponse<T>>) {
    Object.assign(this, partial);
    this.timestamp = new Date().toISOString();
  }

  static success<T>(data: T, message = 'Success'): ApiResponse<T> {
    return new ApiResponse<T>({
      success: true,
      message,
      data,
    });
  }

  static error(message: string): ApiResponse<null> {
    return new ApiResponse<null>({
      success: false,
      message,
      data: null,
    });
  }
}
