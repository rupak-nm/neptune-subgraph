import { loadTransaction } from "../initializers/Transaction";

import {
  CoverPolicyRateSet,
  CoverageLagSet,
} from "../../generated/templates/IPolicyAdmin/IPolicyAdmin";
import {
  CoverPolicyRateSetEvent,
  CoverageLagSetEvent,
} from "../../generated/schema";
import { createEventID } from "../initializers/EventId";

export function handleCoverPolicyRateSet(event: CoverPolicyRateSet): void {
  const id = createEventID(event);
  let entity = CoverPolicyRateSetEvent.load(id);

  if (!entity) {
    entity = new CoverPolicyRateSetEvent(id);
  }

  entity.coverKey = event.params.coverKey;
  entity.floor = event.params.floor;
  entity.ceiling = event.params.ceiling;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}

export function handleCoverageLagSet(event: CoverageLagSet): void {
  const id = createEventID(event);
  let entity = CoverageLagSetEvent.load(id);

  if (!entity) {
    entity = new CoverageLagSetEvent(id);
  }

  entity.coverKey = event.params.coverKey;
  entity.window = event.params.window;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}
