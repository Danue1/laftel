import * as Crypto from 'crypto'

export class Coupon {
  public static readonly isGenerated = (couponList: string[], coupon: string): boolean => {
    return couponList.includes(coupon)
  }

  public static readonly generateByCount = (count: number): string[] => {
    const couponList: string[] = []
    let coupon: string

    for (let index = 0; index < count; index += 1) {
      do {
        coupon = Coupon.generate()
      } while (Coupon.isGenerated(couponList, coupon))

      couponList.push(coupon)
    }

    return couponList
  }

  public static readonly generate = (): string => {
    return Crypto.randomBytes(10).toString('hex')
  }
}
