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

  entity.vault = event.params.vault.toHexString();
  entity.coverKey = event.params.coverKey.toHexString();
  entity.name = event.params.name;
  entity.symbol = event.params.symbol;

  const tx = loadTransaction(event);
  entity.transaction = tx.id;
  entity.createdAtTimestamp = tx.timestamp;

  entity.save();
}
