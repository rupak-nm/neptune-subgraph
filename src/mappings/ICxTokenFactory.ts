import { loadTransaction } from "../initializers/Transaction";

import { CxTokenDeployed } from "../../generated/templates/ICxTokenFactory/ICxTokenFactory";
import { CxTokenDeployedEvent } from "../../generated/schema";
import { createEventID } from "../initializers/EventId";

export function handleCxTokenDeployed(event: CxTokenDeployed): void {
  const id = createEventID(event);
  let entity = CxTokenDeployedEvent.load(id);

  if (!entity) {
    entity = new CxTokenDeployedEvent(id);
  }

  entity.cxToken = event.params.cxToken;
  entity.store = event.params.store;
  entity.coverKey = event.params.coverKey;
  entity.productKey = event.params.productKey;
  entity.tokenName = event.params.tokenName;
  entity.expiryDate = event.params.expiryDate;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}
