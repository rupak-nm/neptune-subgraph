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
import { createEventID } from "../initializers/EventId";
import { BigInt } from "@graphprotocol/graph-ts";

export function handleDeposited(event: Deposited): void {
  const id = createEventID(event);

  let entity = DepositedEvent.load(id);

  if (!entity) {
    entity = new DepositedEvent(id);
  }

  entity.key = event.params.key.toHexString();
  entity.account = event.params.account.toHexString();
  entity.token = event.params.token.toHexString();
  entity.amount = event.params.amount;

  const tx = loadTransaction(event);
  entity.transaction = tx.id;
  entity.createdAtTimestamp = tx.timestamp;

  entity.save();
}

export function handlePoolClosed(event: PoolClosed): void {
  const id = createEventID(event);
  let entity = PoolClosedEvent.load(id);

  if (!entity) {
    entity = new PoolClosedEvent(id);
  }

  entity.key = event.params.key.toHexString();
  entity.name = event.params.name;

  const tx = loadTransaction(event);
  entity.transaction = tx.id;
  entity.createdAtTimestamp = tx.timestamp;

  entity.save();
}

export function handlePoolUpdated(event: PoolUpdated): void {
  const id = createEventID(event);
  let entity = PoolUpdatedEvent.load(id);

  if (!entity) {
    entity = new PoolUpdatedEvent(id);
  }

  entity.key = event.params.key.toHexString();
  entity.name = event.params.args.name;
  entity.poolType = new BigInt(event.params.args.poolType);
  entity.stakingToken = event.params.args.stakingToken.toHexString();
  entity.uniStakingTokenDollarPair = event.params.args.uniStakingTokenDollarPair.toHexString();
  entity.rewardToken = event.params.args.rewardToken.toHexString();
  entity.uniRewardTokenDollarPair = event.params.args.uniRewardTokenDollarPair.toHexString();
  entity.stakingTarget = event.params.args.stakingTarget;
  entity.maxStake = event.params.args.maxStake;
  entity.platformFee = event.params.args.platformFee;
  entity.rewardPerBlock = event.params.args.rewardPerBlock;
  entity.lockupPeriod = event.params.args.lockupPeriod;
  entity.rewardTokenToDeposit = event.params.args.rewardTokenToDeposit;

  const tx = loadTransaction(event);
  entity.transaction = tx.id;
  entity.createdAtTimestamp = tx.timestamp;

  entity.save();
}

export function handleRewardsWithdrawn(event: RewardsWithdrawn): void {
  const id = createEventID(event);

  let entity = RewardsWithdrawnEvent.load(id);

  if (!entity) {
    entity = new RewardsWithdrawnEvent(id);
  }

  entity.key = event.params.key.toHexString();
  entity.account = event.params.account.toHexString();
  entity.token = event.params.token.toHexString();
  entity.rewards = event.params.rewards;
  entity.platformFee = event.params.platformFee;

  const tx = loadTransaction(event);
  entity.transaction = tx.id;
  entity.createdAtTimestamp = tx.timestamp;

  entity.save();
}

export function handleWithdrawn(event: Withdrawn): void {
  const id = createEventID(event);

  let entity = WithdrawnEvent.load(id);

  if (!entity) {
    entity = new WithdrawnEvent(id);
  }

  entity.key = event.params.key.toHexString();
  entity.account = event.params.account.toHexString();
  entity.token = event.params.token.toHexString();
  entity.amount = event.params.amount;

  const tx = loadTransaction(event);
  entity.transaction = tx.id;
  entity.createdAtTimestamp = tx.timestamp;

  entity.save();
}
