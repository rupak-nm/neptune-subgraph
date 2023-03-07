import { loadTransaction } from "../initializers/Transaction";

import {
  Approval,
  CoverageStartSet,
  Transfer,
} from "../../generated/templates/ICxToken/ICxToken";
import { CoverageStartSetEvent } from "../../generated/schema";
import { createEventID } from "../initializers/EventId";

export function handleCoverageStartSet(event: CoverageStartSet): void {
  const id = createEventID(event);
  let entity = CoverageStartSetEvent.load(id);

  if (!entity) {
    entity = new CoverageStartSetEvent(id);
  }

  entity.policyId = event.params.policyId;
  entity.coverKey = event.params.coverKey.toHexString();
  entity.productKey = event.params.productKey.toHexString();
  entity.account = event.params.account.toHexString();
  entity.effectiveFrom = event.params.effectiveFrom;
  entity.amount = event.params.amount;

  const tx = loadTransaction(event);
  entity.transaction = tx.id;
  entity.createdAtTimestamp = tx.timestamp;

  entity.save();
}
