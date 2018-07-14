import { Numeronym, Coupon, AutoComplete } from '../src'

const enum ELAPSE {
  NUROMENYM = 'NUROMENYM',
  COUPON = 'COUPON',
  AUTO_COMPLETE = 'AUTO_COMPLETE'
}

console.time(ELAPSE.NUROMENYM)
const numeronym = new Numeronym()
console.log(numeronym.exec([1]))
console.log(numeronym.exec([1, 2]))
console.log(numeronym.exec([1, 3]))
console.log(numeronym.exec([1, 2, 3]))
console.log(numeronym.exec([1, 2, 3, 6, 8, 9, 10]))
console.log(numeronym.exec([13, 14, 15, 16, 20, 23, 24, 25, 100]))
console.timeEnd(ELAPSE.NUROMENYM)

// 10만 개의 경우 작성 당시 사양 기준으로 1분 정도 걸려요
console.time(ELAPSE.COUPON)
const coupon = new Coupon()
const couponList = coupon.generateByCount(100000)
console.log(couponList, couponList.length)
console.log(coupon.isGeneratedCoupon(couponList[0]))
console.timeEnd(ELAPSE.COUPON)

console.time(ELAPSE.AUTO_COMPLETE)
const statement = '동해물과 백두산이 마르고 닳도록, 하느님이 보우하사 우리나라 만세'
const autoComplete = new AutoComplete()
console.log(autoComplete.searchByKeyword(statement, 'ㅁ'))
console.log(autoComplete.searchByKeyword(statement, '우린'))
console.log(autoComplete.searchByKeyword(statement, '록한'))
console.timeEnd(ELAPSE.AUTO_COMPLETE)
