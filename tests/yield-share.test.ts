import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { SharesDeposited } from "../generated/schema"
import { SharesDeposited as SharesDepositedEvent } from "../generated/YieldShare/YieldShare"
import { handleSharesDeposited } from "../src/yield-share"
import { createSharesDepositedEvent } from "./yield-share-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let user = Address.fromString("0x0000000000000000000000000000000000000001")
    let shares = BigInt.fromI32(234)
    let newSharesDepositedEvent = createSharesDepositedEvent(user, shares)
    handleSharesDeposited(newSharesDepositedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("SharesDeposited created and stored", () => {
    assert.entityCount("SharesDeposited", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "SharesDeposited",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "user",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "SharesDeposited",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "shares",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
