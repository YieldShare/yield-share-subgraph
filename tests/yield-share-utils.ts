import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  SharesDeposited,
  SharesWithdrawn,
  YieldSharingCollected,
  YieldSharingStarted,
  YieldSharingStopped
} from "../generated/YieldShare/YieldShare"

export function createSharesDepositedEvent(
  user: Address,
  shares: BigInt
): SharesDeposited {
  let sharesDepositedEvent = changetype<SharesDeposited>(newMockEvent())

  sharesDepositedEvent.parameters = new Array()

  sharesDepositedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  sharesDepositedEvent.parameters.push(
    new ethereum.EventParam("shares", ethereum.Value.fromUnsignedBigInt(shares))
  )

  return sharesDepositedEvent
}

export function createSharesWithdrawnEvent(
  user: Address,
  shares: BigInt
): SharesWithdrawn {
  let sharesWithdrawnEvent = changetype<SharesWithdrawn>(newMockEvent())

  sharesWithdrawnEvent.parameters = new Array()

  sharesWithdrawnEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  sharesWithdrawnEvent.parameters.push(
    new ethereum.EventParam("shares", ethereum.Value.fromUnsignedBigInt(shares))
  )

  return sharesWithdrawnEvent
}

export function createYieldSharingCollectedEvent(
  from: Address,
  to: Address,
  senderBalance: BigInt,
  receiverBalance: BigInt,
  feeBalance: BigInt
): YieldSharingCollected {
  let yieldSharingCollectedEvent = changetype<YieldSharingCollected>(
    newMockEvent()
  )

  yieldSharingCollectedEvent.parameters = new Array()

  yieldSharingCollectedEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  yieldSharingCollectedEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  yieldSharingCollectedEvent.parameters.push(
    new ethereum.EventParam(
      "senderBalance",
      ethereum.Value.fromUnsignedBigInt(senderBalance)
    )
  )
  yieldSharingCollectedEvent.parameters.push(
    new ethereum.EventParam(
      "receiverBalance",
      ethereum.Value.fromUnsignedBigInt(receiverBalance)
    )
  )
  yieldSharingCollectedEvent.parameters.push(
    new ethereum.EventParam(
      "feeBalance",
      ethereum.Value.fromUnsignedBigInt(feeBalance)
    )
  )

  return yieldSharingCollectedEvent
}

export function createYieldSharingStartedEvent(
  from: Address,
  to: Address,
  shares: BigInt,
  assets: BigInt,
  percentage: i32
): YieldSharingStarted {
  let yieldSharingStartedEvent = changetype<YieldSharingStarted>(newMockEvent())

  yieldSharingStartedEvent.parameters = new Array()

  yieldSharingStartedEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  yieldSharingStartedEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  yieldSharingStartedEvent.parameters.push(
    new ethereum.EventParam("shares", ethereum.Value.fromUnsignedBigInt(shares))
  )
  yieldSharingStartedEvent.parameters.push(
    new ethereum.EventParam("assets", ethereum.Value.fromUnsignedBigInt(assets))
  )
  yieldSharingStartedEvent.parameters.push(
    new ethereum.EventParam(
      "percentage",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(percentage))
    )
  )

  return yieldSharingStartedEvent
}

export function createYieldSharingStoppedEvent(
  from: Address,
  to: Address,
  senderBalance: BigInt,
  receiverBalance: BigInt,
  feeBalance: BigInt
): YieldSharingStopped {
  let yieldSharingStoppedEvent = changetype<YieldSharingStopped>(newMockEvent())

  yieldSharingStoppedEvent.parameters = new Array()

  yieldSharingStoppedEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  yieldSharingStoppedEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  yieldSharingStoppedEvent.parameters.push(
    new ethereum.EventParam(
      "senderBalance",
      ethereum.Value.fromUnsignedBigInt(senderBalance)
    )
  )
  yieldSharingStoppedEvent.parameters.push(
    new ethereum.EventParam(
      "receiverBalance",
      ethereum.Value.fromUnsignedBigInt(receiverBalance)
    )
  )
  yieldSharingStoppedEvent.parameters.push(
    new ethereum.EventParam(
      "feeBalance",
      ethereum.Value.fromUnsignedBigInt(feeBalance)
    )
  )

  return yieldSharingStoppedEvent
}
