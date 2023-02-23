import { loadTransaction } from "../initializers/Transaction";

import {
  CoverPolicyRateSet,
  CoverageLagSet,
} from "../../generated/templates/IPolicyAdmin/IPolicyAdmin";
import {
  CoverPolicyRateSetEvent,
  CoverageLagSetEvent,
} from "../../generated/schema";

export function handleCoverPolicyRateSet(event: CoverPolicyRateSet): void {
  let entity = CoverPolicyRateSetEvent.load(event.transaction.hash.toString());

  if (!entity) {
    entity = new CoverPolicyRateSetEvent(event.transaction.hash.toString());
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
  let entity = CoverageLagSetEvent.load(event.transaction.hash.toString());

  if (!entity) {
    entity = new CoverageLagSetEvent(event.transaction.hash.toString());
  }

  entity.coverKey = event.params.coverKey;
  entity.window = event.params.window;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}
