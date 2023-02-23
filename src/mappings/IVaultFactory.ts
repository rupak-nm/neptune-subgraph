import { loadTransaction } from "../initializers/Transaction";

import { VaultDeployed } from "../../generated/templates/IVaultFactory/IVaultFactory";
import { VaultDeployedEvent } from "../../generated/schema";

export function handleVaultDeployed(event: VaultDeployed): void {
  let entity = VaultDeployedEvent.load(event.transaction.hash.toString());

  if (!entity) {
    entity = new VaultDeployedEvent(event.transaction.hash.toString());
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
