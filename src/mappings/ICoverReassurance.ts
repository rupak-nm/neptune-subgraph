import { loadTransaction } from "../initializers/Transaction";

import {
  PoolCapitalized,
  ReassuranceAdded,
  WeightSet,
} from "../../generated/templates/ICoverReassurance/ICoverReassurance";
import {
  PoolCapitalizedEvent,
  ReassuranceAddedEvent,
  WeightSetEvent,
} from "../../generated/schema";
import { createEventID } from "../initializers/EventId";

export function handlePoolCapitalized(event: PoolCapitalized): void {
  const id = createEventID(event);
  let entity = PoolCapitalizedEvent.load(id);

  if (!entity) {
    entity = new PoolCapitalizedEvent(id);
  }

  entity.coverKey = event.params.coverKey.toHexString();
  entity.productKey = event.params.productKey.toHexString();
  entity.incidentDate = event.params.incidentDate;
  entity.amount = event.params.amount;

  const tx = loadTransaction(event);
  entity.transaction = tx.id;

  entity.save();
}

export function handleReassuranceAdded(event: ReassuranceAdded): void {
  const id = createEventID(event);
  let entity = ReassuranceAddedEvent.load(id);

  if (!entity) {
    entity = new ReassuranceAddedEvent(id);
  }

  entity.coverKey = event.params.coverKey.toHexString();
  entity.onBehalfOf = event.params.onBehalfOf.toHexString();
  entity.amount = event.params.amount;

  const tx = loadTransaction(event);
  entity.transaction = tx.id;

  entity.save();
}

export function handleWeightSet(event: WeightSet): void {
  const id = createEventID(event);
  let entity = WeightSetEvent.load(id);

  if (!entity) {
    entity = new WeightSetEvent(id);
  }

  entity.coverKey = event.params.coverKey.toHexString();
  entity.weight = event.params.weight;

  const tx = loadTransaction(event);
  entity.transaction = tx.id;

  entity.save();
}
