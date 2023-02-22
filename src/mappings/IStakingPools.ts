import { loadTransaction } from "../initializers/Transaction";

import {
  Deposited,
  PoolClosed,
  PoolUpdated,
  RewardsWithdrawn,
  Withdrawn,
} from "../../generated/IStakingPools/IStakingPools";
import {
  DepositedEvent,
  PoolClosedEvent,
  PoolUpdatedEvent,
  RewardsWithdrawnEvent,
  WithdrawnEvent,
} from "../../generated/schema";

export function handleDeposited(event: Deposited): void {
  let entity = DepositedEvent.load(event.transaction.hash.toString());

  if (!entity) {
    entity = new DepositedEvent(event.transaction.hash.toString());
  }

  entity.key = event.params.key;

  entity.account = event.params.account;

  entity.token = event.params.token;

  entity.amount = event.params.amount;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}

export function handlePoolClosed(event: PoolClosed): void {
  let entity = PoolClosedEvent.load(event.transaction.hash.toString());

  if (!entity) {
    entity = new PoolClosedEvent(event.transaction.hash.toString());
  }

  entity.key = event.params.key;

  entity.name = event.params.name;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}

export function handlePoolUpdated(event: PoolUpdated): void {
  let entity = PoolUpdatedEvent.load(event.transaction.hash.toString());

  if (!entity) {
    entity = new PoolUpdatedEvent(event.transaction.hash.toString());
  }

  entity.key = event.params.key;

  entity.key = event.params.args.key;

  entity.name = event.params.args.name;

  entity.poolType = event.params.args.poolType;

  entity.stakingToken = event.params.args.stakingToken;

  entity.uniStakingTokenDollarPair =
    event.params.args.uniStakingTokenDollarPair;

  entity.rewardToken = event.params.args.rewardToken;

  entity.uniRewardTokenDollarPair = event.params.args.uniRewardTokenDollarPair;

  entity.stakingTarget = event.params.args.stakingTarget;

  entity.maxStake = event.params.args.maxStake;

  entity.platformFee = event.params.args.platformFee;

  entity.rewardPerBlock = event.params.args.rewardPerBlock;

  entity.lockupPeriod = event.params.args.lockupPeriod;

  entity.rewardTokenToDeposit = event.params.args.rewardTokenToDeposit;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}

export function handleRewardsWithdrawn(event: RewardsWithdrawn): void {
  let entity = RewardsWithdrawnEvent.load(event.transaction.hash.toString());

  if (!entity) {
    entity = new RewardsWithdrawnEvent(event.transaction.hash.toString());
  }

  entity.key = event.params.key;

  entity.account = event.params.account;

  entity.token = event.params.token;

  entity.rewards = event.params.rewards;

  entity.platformFee = event.params.platformFee;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}

export function handleWithdrawn(event: Withdrawn): void {
  let entity = WithdrawnEvent.load(event.transaction.hash.toString());

  if (!entity) {
    entity = new WithdrawnEvent(event.transaction.hash.toString());
  }

  entity.key = event.params.key;

  entity.account = event.params.account;

  entity.token = event.params.token;

  entity.amount = event.params.amount;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}
