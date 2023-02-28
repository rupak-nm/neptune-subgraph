import { loadTransaction } from "../initializers/Transaction";

import {
  Deposited,
  PoolClosed,
  PoolUpdated,
  RewardsWithdrawn,
  Withdrawn,
} from "../../generated/templates/IStakingPools/IStakingPools";
import {
  DepositedEvent,
  PoolClosedEvent,
  PoolUpdatedEvent,
  RewardsWithdrawnEvent,
  WithdrawnEvent,
} from "../../generated/schema";

export function handleDeposited(event: Deposited): void {
  const id = event.transaction.hash.toHexString().concat("-deposit");

  let entity = DepositedEvent.load(id);

  if (!entity) {
    entity = new DepositedEvent(id);
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
  let entity = PoolClosedEvent.load(event.transaction.hash.toHexString());

  if (!entity) {
    entity = new PoolClosedEvent(event.transaction.hash.toHexString());
  }

  entity.key = event.params.key;
  entity.name = event.params.name;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}

export function handlePoolUpdated(event: PoolUpdated): void {
  let entity = PoolUpdatedEvent.load(event.transaction.hash.toHexString());

  if (!entity) {
    entity = new PoolUpdatedEvent(event.transaction.hash.toHexString());
  }

  entity.key = event.params.key;
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
  const id = event.transaction.hash.toHexString().concat("-rewards-withdrawal");

  let entity = RewardsWithdrawnEvent.load(id);

  if (!entity) {
    entity = new RewardsWithdrawnEvent(id);
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
  const id = event.transaction.hash.toHexString().concat("-withdrawal");

  let entity = WithdrawnEvent.load(id);

  if (!entity) {
    entity = new WithdrawnEvent(id);
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
