import {
  OwnershipTransferred as OwnershipTransferredEvent,
  TreasuryChanged as TreasuryChangedEvent,
  YieldShareVaultCreated as YieldShareVaultCreatedEvent,
} from "../generated/YieldShareFactory/YieldShareFactory";
import {
  OwnershipTransferred,
  TreasuryChanged,
  YieldShareVaultCreated,
  YieldShare,
} from "../generated/schema";
import { YieldShare as YieldShareTemplate } from "../generated/templates";

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.user = event.params.user;
  entity.newOwner = event.params.newOwner;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleTreasuryChanged(event: TreasuryChangedEvent): void {
  let entity = new TreasuryChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.oldTreasury = event.params.oldTreasury;
  entity.newTreasury = event.params.newTreasury;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleYieldShareVaultCreated(
  event: YieldShareVaultCreatedEvent
): void {
  let entity = new YieldShareVaultCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.vault = event.params.vault;
  entity.yieldShare = event.params.yieldShare;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  const yieldShareContract = new YieldShare(event.params.yieldShare);
  yieldShareContract.vault = event.params.vault;
  yieldShareContract.save();

  YieldShareTemplate.create(event.params.yieldShare);
}
