import { loadTransaction } from "../initializers/Transaction";

import { PausersSet } from "../../generated/templates/IStore/IStore";
import { PausersSetEvent } from "../../generated/schema";
import { Bytes } from "@graphprotocol/graph-ts";
import { createEventID } from "../initializers/EventId";

export function handlePausersSet(event: PausersSet): void {
  const id = createEventID(event);
  let entity = PausersSetEvent.load(id);

  if (!entity) {
    entity = new PausersSetEvent(id);
  }

  entity.addedBy = event.params.addedBy.toHexString();
  entity.accounts = changetype<string[]>(event.params.accounts);
  entity.statuses = event.params.statuses;

  const tx = loadTransaction(event);
  entity.transaction = tx.id;
  entity.createdAtTimestamp = tx.timestamp;

  entity.save();
}
