import { loadTransaction } from "../initializers/Transaction";

import { PausersSet } from "../../generated/IStore/IStore";
import { PausersSetEvent } from "../../generated/schema";
import { Bytes } from "@graphprotocol/graph-ts";

export function handlePausersSet(event: PausersSet): void {
  let entity = PausersSetEvent.load(event.transaction.hash.toString());

  if (!entity) {
    entity = new PausersSetEvent(event.transaction.hash.toString());
  }

  entity.addedBy = event.params.addedBy;

  entity.accounts = changetype<Bytes[]>(event.params.accounts);

  entity.statuses = event.params.statuses;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}
