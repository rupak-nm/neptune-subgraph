import { loadTransaction } from "../initializers/Transaction";

import { CoverPurchased } from "../../generated/templates/IPolicy/IPolicy";
import { CoverPurchasedEvent } from "../../generated/schema";
import { createEventID } from "../initializers/EventId";

export function handleCoverPurchased(event: CoverPurchased): void {
  const id = createEventID(event);
  let entity = CoverPurchasedEvent.load(id);

  if (!entity) {
    entity = new CoverPurchasedEvent(id);
  }

  entity.onBehalfOf = event.params.args.onBehalfOf.toHexString();
  entity.coverKey = event.params.args.coverKey.toHexString();
  entity.productKey = event.params.args.productKey.toHexString();
  entity.coverDuration = event.params.args.coverDuration;
  entity.amountToCover = event.params.args.amountToCover;
  entity.referralCode = event.params.args.referralCode.toHexString();
  entity.cxToken = event.params.cxToken.toHexString();
  entity.fee = event.params.fee;
  entity.platformFee = event.params.platformFee;
  entity.expiresOn = event.params.expiresOn;
  entity.policyId = event.params.policyId;

  const tx = loadTransaction(event);
  entity.transaction = tx.id;
  entity.createdAtTimestamp = tx.timestamp;

  entity.save();
}
