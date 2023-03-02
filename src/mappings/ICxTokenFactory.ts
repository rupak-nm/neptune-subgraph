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

  entity.cxToken = event.params.cxToken.toHexString();
  entity.store = event.params.store.toHexString();
  entity.coverKey = event.params.coverKey.toHexString();
  entity.productKey = event.params.productKey.toHexString();
  entity.tokenName = event.params.tokenName;
  entity.expiryDate = event.params.expiryDate;

  const tx = loadTransaction(event);
  entity.transaction = tx.id;

  entity.save();
}
