import { loadTransaction } from "../initializers/Transaction";

import {
  PoolCapitalized,
  ReassuranceAdded,
  WeightSet,
} from "../../generated/ICoverReassurance/ICoverReassurance";
import {
  PoolCapitalizedEvent,
  ReassuranceAddedEvent,
  WeightSetEvent,
} from "../../generated/schema";

export function handlePoolCapitalized(event: PoolCapitalized): void {
  let entity = PoolCapitalizedEvent.load(event.transaction.hash.toString());

  if (!entity) {
    entity = new PoolCapitalizedEvent(event.transaction.hash.toString());
  }

  entity.coverKey = event.params.coverKey;

  entity.productKey = event.params.productKey;

  entity.incidentDate = event.params.incidentDate;

  entity.amount = event.params.amount;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}

export function handleReassuranceAdded(event: ReassuranceAdded): void {
  let entity = ReassuranceAddedEvent.load(event.transaction.hash.toString());

  if (!entity) {
    entity = new ReassuranceAddedEvent(event.transaction.hash.toString());
  }

  entity.coverKey = event.params.coverKey;

  entity.onBehalfOf = event.params.onBehalfOf;

  entity.amount = event.params.amount;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}

export function handleWeightSet(event: WeightSet): void {
  let entity = WeightSetEvent.load(event.transaction.hash.toString());

  if (!entity) {
    entity = new WeightSetEvent(event.transaction.hash.toString());
  }

  entity.coverKey = event.params.coverKey;

  entity.weight = event.params.weight;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}
