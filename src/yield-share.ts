import {
  SharesDeposited as SharesDepositedEvent,
  SharesWithdrawn as SharesWithdrawnEvent,
  YieldSharingCollected as YieldSharingCollectedEvent,
  YieldSharingStarted as YieldSharingStartedEvent,
  YieldSharingStopped as YieldSharingStoppedEvent
} from "../generated/YieldShare/YieldShare"
import {
  SharesDeposited,
  SharesWithdrawn,
  YieldSharingCollected,
  YieldSharingStarted,
  YieldSharingStopped
} from "../generated/schema"

export function handleSharesDeposited(event: SharesDepositedEvent): void {
  let entity = new SharesDeposited(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.shares = event.params.shares

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSharesWithdrawn(event: SharesWithdrawnEvent): void {
  let entity = new SharesWithdrawn(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.shares = event.params.shares

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleYieldSharingCollected(
  event: YieldSharingCollectedEvent
): void {
  let entity = new YieldSharingCollected(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.from = event.params.from
  entity.to = event.params.to
  entity.senderBalance = event.params.senderBalance
  entity.receiverBalance = event.params.receiverBalance
  entity.feeBalance = event.params.feeBalance

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleYieldSharingStarted(
  event: YieldSharingStartedEvent
): void {
  let entity = new YieldSharingStarted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.from = event.params.from
  entity.to = event.params.to
  entity.shares = event.params.shares
  entity.assets = event.params.assets
  entity.percentage = event.params.percentage

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleYieldSharingStopped(
  event: YieldSharingStoppedEvent
): void {
  let entity = new YieldSharingStopped(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.from = event.params.from
  entity.to = event.params.to
  entity.senderBalance = event.params.senderBalance
  entity.receiverBalance = event.params.receiverBalance
  entity.feeBalance = event.params.feeBalance

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
