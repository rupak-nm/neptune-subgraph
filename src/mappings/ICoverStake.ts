import { loadTransaction } from "../initializers/Transaction";

import {
  FeeBurned,
  StakeAdded,
  StakeRemoved,
} from "../../generated/templates/ICoverStake/ICoverStake";
import {
  FeeBurnedEvent,
  StakeAddedEvent,
  StakeRemovedEvent,
} from "../../generated/schema";

export function handleFeeBurned(event: FeeBurned): void {
  let entity = FeeBurnedEvent.load(event.transaction.hash.toHexString());

  if (!entity) {
    entity = new FeeBurnedEvent(event.transaction.hash.toHexString());
  }

  entity.coverKey = event.params.coverKey;
  entity.amount = event.params.amount;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}

export function handleStakeAdded(event: StakeAdded): void {
  let entity = StakeAddedEvent.load(event.transaction.hash.toHexString());

  if (!entity) {
    entity = new StakeAddedEvent(event.transaction.hash.toHexString());
  }

  entity.coverKey = event.params.coverKey;
  entity.account = event.params.account;
  entity.amount = event.params.amount;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}

export function handleStakeRemoved(event: StakeRemoved): void {
  let entity = StakeRemovedEvent.load(event.transaction.hash.toHexString());

  if (!entity) {
    entity = new StakeRemovedEvent(event.transaction.hash.toHexString());
  }

  entity.coverKey = event.params.coverKey;
  entity.account = event.params.account;
  entity.amount = event.params.amount;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}
