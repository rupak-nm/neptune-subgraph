import { loadTransaction } from "../initializers/Transaction";

import { VaultDeployed } from "../../generated/templates/IVaultFactory/IVaultFactory";
import { VaultDeployedEvent } from "../../generated/schema";
import { createEventID } from "../initializers/EventId";

export function handleVaultDeployed(event: VaultDeployed): void {
  const id = createEventID(event);
  let entity = VaultDeployedEvent.load(id);

  if (!entity) {
    entity = new VaultDeployedEvent(id);
  }

  entity.vault = event.params.vault;
  entity.coverKey = event.params.coverKey;
  entity.name = event.params.name;
  entity.symbol = event.params.symbol;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}
