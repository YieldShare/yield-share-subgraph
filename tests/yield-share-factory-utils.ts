import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import {
  OwnershipTransferred,
  TreasuryChanged,
  YieldShareVaultCreated
} from "../generated/YieldShareFactory/YieldShareFactory"

export function createOwnershipTransferredEvent(
  user: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createTreasuryChangedEvent(
  oldTreasury: Address,
  newTreasury: Address
): TreasuryChanged {
  let treasuryChangedEvent = changetype<TreasuryChanged>(newMockEvent())

  treasuryChangedEvent.parameters = new Array()

  treasuryChangedEvent.parameters.push(
    new ethereum.EventParam(
      "oldTreasury",
      ethereum.Value.fromAddress(oldTreasury)
    )
  )
  treasuryChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newTreasury",
      ethereum.Value.fromAddress(newTreasury)
    )
  )

  return treasuryChangedEvent
}

export function createYieldShareVaultCreatedEvent(
  vault: Address,
  yieldShare: Address
): YieldShareVaultCreated {
  let yieldShareVaultCreatedEvent = changetype<YieldShareVaultCreated>(
    newMockEvent()
  )

  yieldShareVaultCreatedEvent.parameters = new Array()

  yieldShareVaultCreatedEvent.parameters.push(
    new ethereum.EventParam("vault", ethereum.Value.fromAddress(vault))
  )
  yieldShareVaultCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "yieldShare",
      ethereum.Value.fromAddress(yieldShare)
    )
  )

  return yieldShareVaultCreatedEvent
}
