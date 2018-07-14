import * as Crypto from 'crypto'

export class Coupon {
  private readonly couponList: string[] = []

  public generateByCount(count: number): string[] {
    for (let index = 0; index < count; index += 1) {
      let coupon: string
      do {
        coupon = this.generateCoupon()
      } while (this.isGeneratedCoupon(coupon))
      this.couponList.push(coupon)
    }

    return this.couponList
  }

  private generateCoupon(): string {
    return Crypto.randomBytes(10).toString('hex')
  }

  public isGeneratedCoupon(coupon: string): boolean {
    return this.couponList.includes(coupon)
  }
}
