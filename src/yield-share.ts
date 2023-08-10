import { BigInt, Bytes } from "@graphprotocol/graph-ts";
import {
  SharesDeposited as SharesDepositedEvent,
  SharesWithdrawn as SharesWithdrawnEvent,
  YieldShare,
  YieldSharingCollected as YieldSharingCollectedEvent,
  YieldSharingStarted as YieldSharingStartedEvent,
  YieldSharingStopped as YieldSharingStoppedEvent,
} from "../generated/YieldShare/YieldShare";
import {
  SharesDeposited,
  SharesWithdrawn,
  YieldSharingCollected,
  YieldSharingStarted,
  YieldSharingStopped,
  Balance,
  YieldSharing,
} from "../generated/schema";

function getBalance(contract: Bytes, user: Bytes): Balance {
  const balanceId = contract.concat(user);
  let balance = Balance.load(balanceId);

  if (balance == null) {
    balance = new Balance(balanceId);
    balance.contract = contract;
    balance.user = user;
    balance.shares = BigInt.fromI32(0);
  }

  return balance;
}

function getYieldSharing(
  contract: Bytes,
  from: Bytes,
  to: Bytes
): YieldSharing {
  const yieldSharingId = contract.concat(from).concat(to);
  let yieldSharing = YieldSharing.load(yieldSharingId);

  if (yieldSharing == null) {
    yieldSharing = new YieldSharing(yieldSharingId);
    yieldSharing.contract = contract;
    yieldSharing.from = from;
    yieldSharing.to = to;
    yieldSharing.shares = BigInt.fromI32(0);
    yieldSharing.percentage = 0;
  }

  return yieldSharing;
}

export function handleSharesDeposited(event: SharesDepositedEvent): void {
  let entity = new SharesDeposited(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.contract = event.address;
  entity.user = event.params.user;
  entity.shares = event.params.shares;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  // Update balance
  const balance = getBalance(event.address, event.params.user);
  balance.shares = balance.shares.plus(event.params.shares);
  balance.save();
}

export function handleSharesWithdrawn(event: SharesWithdrawnEvent): void {
  let entity = new SharesWithdrawn(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.contract = event.address;
  entity.user = event.params.user;
  entity.shares = event.params.shares;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  // Update balance
  const balance = getBalance(event.address, event.params.user);
  balance.shares = balance.shares.minus(event.params.shares);
  balance.save();
}

export function handleYieldSharingCollected(
  event: YieldSharingCollectedEvent
): void {
  let entity = new YieldSharingCollected(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.contract = event.address;
  entity.from = event.params.from;
  entity.to = event.params.to;
  entity.senderBalance = event.params.senderBalance;
  entity.receiverBalance = event.params.receiverBalance;
  entity.feeBalance = event.params.feeBalance;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  // Update balances
  const receiverBalance = getBalance(event.address, event.params.to);
  receiverBalance.shares = receiverBalance.shares.plus(
    event.params.receiverBalance
  );
  receiverBalance.save();

  const treasuryAddress = YieldShare.bind(event.address).TREASURY();
  const treasuryBalance = getBalance(event.address, treasuryAddress);
  treasuryBalance.shares = treasuryBalance.shares.plus(event.params.feeBalance);
  treasuryBalance.save();

  // Update Yield Sharing
  const yieldSharing = getYieldSharing(
    event.address,
    event.params.from,
    event.params.to
  );
  yieldSharing.shares = event.params.senderBalance;
  yieldSharing.save();
}

export function handleYieldSharingStarted(
  event: YieldSharingStartedEvent
): void {
  let entity = new YieldSharingStarted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.contract = event.address;
  entity.from = event.params.from;
  entity.to = event.params.to;
  entity.shares = event.params.shares;
  entity.assets = event.params.assets;
  entity.percentage = event.params.percentage;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  // Update balance
  const balance = getBalance(event.address, event.params.from);
  balance.shares = balance.shares.minus(event.params.shares);
  balance.save();

  // Update Yield Sharing
  const yieldSharing = getYieldSharing(
    event.address,
    event.params.from,
    event.params.to
  );
  yieldSharing.shares = event.params.shares;
  yieldSharing.percentage = event.params.percentage;
  yieldSharing.save();
}

export function handleYieldSharingStopped(
  event: YieldSharingStoppedEvent
): void {
  let entity = new YieldSharingStopped(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.contract = event.address;
  entity.from = event.params.from;
  entity.to = event.params.to;
  entity.senderBalance = event.params.senderBalance;
  entity.receiverBalance = event.params.receiverBalance;
  entity.feeBalance = event.params.feeBalance;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  // Update balances
  const senderBalance = getBalance(event.address, event.params.from);
  senderBalance.shares = senderBalance.shares.plus(event.params.senderBalance);
  senderBalance.save();

  const receiverBalance = getBalance(event.address, event.params.to);
  receiverBalance.shares = receiverBalance.shares.plus(
    event.params.receiverBalance
  );
  receiverBalance.save();

  const treasuryAddress = YieldShare.bind(event.address).TREASURY();
  const treasuryBalance = getBalance(event.address, treasuryAddress);
  treasuryBalance.shares = treasuryBalance.shares.plus(event.params.feeBalance);
  treasuryBalance.save();

  // Update Yield Sharing
  const yieldSharing = getYieldSharing(
    event.address,
    event.params.from,
    event.params.to
  );
  yieldSharing.shares = BigInt.fromI32(0);
  yieldSharing.percentage = 0;
  yieldSharing.save();
}
