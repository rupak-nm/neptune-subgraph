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
import { createEventID } from "../initializers/EventId";

export function handleFeeBurned(event: FeeBurned): void {
  const id = createEventID(event);
  let entity = FeeBurnedEvent.load(id);

  if (!entity) {
    entity = new FeeBurnedEvent(id);
  }

  entity.coverKey = event.params.coverKey.toHexString();
  entity.amount = event.params.amount;

  const tx = loadTransaction(event);
  entity.transaction = tx.id;

  entity.save();
}

export function handleStakeAdded(event: StakeAdded): void {
  const id = createEventID(event);
  let entity = StakeAddedEvent.load(id);

  if (!entity) {
    entity = new StakeAddedEvent(id);
  }

  entity.coverKey = event.params.coverKey.toHexString();
  entity.account = event.params.account.toHexString();
  entity.amount = event.params.amount;

  const tx = loadTransaction(event);
  entity.transaction = tx.id;

  entity.save();
}

export function handleStakeRemoved(event: StakeRemoved): void {
  const id = createEventID(event);
  let entity = StakeRemovedEvent.load(id);

  if (!entity) {
    entity = new StakeRemovedEvent(id);
  }

  entity.coverKey = event.params.coverKey.toHexString();
  entity.account = event.params.account.toHexString();
  entity.amount = event.params.amount;

  const tx = loadTransaction(event);
  entity.transaction = tx.id;

  entity.save();
}
