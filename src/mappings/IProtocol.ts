import { loadTransaction } from "../initializers/Transaction";

import {
  ContractAdded,
  ContractUpgraded,
  Initialized,
  MemberAdded,
  MemberRemoved,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
} from "../../generated/IProtocol/IProtocol";
import {
  ContractAddedEvent,
  ContractUpgradedEvent,
  InitializedEvent,
  MemberAddedEvent,
  MemberRemovedEvent,
  RoleAdminChangedEvent,
  RoleGrantedEvent,
  RoleRevokedEvent,
} from "../../generated/schema";

import {
  IBondPool as BondPoolTemplate,
  IClaimsProcessor as ClaimsProcessorTemplate,
  ICover as CoverTemplate,
  ICxTokenFactory as CxTokenFactoryTemplate,
  IPolicy as PolicyTemplate,
  IStakingPools as StakingPoolsTemplate,
  IVaultFactory as VaultFactoryTemplate,
  IGovernance as GovernanceTemplate,
  IResolution as ResolutionTemplate,
  ILiquidityEngine as LiquidityEngineTemplate,
  ICoverReassurance as CoverReassuranceTemplate,
  ICoverStake as CoverStakeTemplate,
  IPolicyAdmin as PolicyAdminTemplate,
  IVault as VaultTemplate,
  // IStore as StoreTemplate,
} from "../../generated/templates";
import {
  CNS_COVER_POLICY,
  CNS_COVER,
  CNS_BOND_POOL,
  CNS_COVER_VAULT_FACTORY,
  CNS_STAKING_POOL,
  CNS_GOVERNANCE,
  CNS_GOVERNANCE_RESOLUTION,
  CNS_COVER_CXTOKEN_FACTORY,
  CNS_LIQUIDITY_ENGINE,
  CNS_CLAIM_PROCESSOR,
  CNS_COVER_REASSURANCE,
  CNS_COVER_STAKE,
  CNS_COVER_POLICY_ADMIN,
  CNS_COVER_VAULT,
} from "../utils/keys";
import { Address, ByteArray, Bytes } from "@graphprotocol/graph-ts";
import { createEventID } from "../initializers/EventId";

function isMatch(namespace: Bytes, key: ByteArray): boolean {
  return Bytes.fromUTF8(namespace.toString()).equals(key);
}

function createTemplate(namespace: Bytes, address: Address): void {
  if (isMatch(namespace, CNS_COVER_POLICY)) {
    PolicyTemplate.create(address);
  } else if (isMatch(namespace, CNS_COVER)) {
    CoverTemplate.create(address);
  } else if (isMatch(namespace, CNS_BOND_POOL)) {
    BondPoolTemplate.create(address);
  } else if (isMatch(namespace, CNS_GOVERNANCE)) {
    GovernanceTemplate.create(address);
  } else if (isMatch(namespace, CNS_GOVERNANCE_RESOLUTION)) {
    ResolutionTemplate.create(address);
  } else if (isMatch(namespace, CNS_STAKING_POOL)) {
    StakingPoolsTemplate.create(address);
  } else if (isMatch(namespace, CNS_COVER_VAULT_FACTORY)) {
    VaultFactoryTemplate.create(address);
  } else if (isMatch(namespace, CNS_COVER_CXTOKEN_FACTORY)) {
    CxTokenFactoryTemplate.create(address);
  } else if (isMatch(namespace, CNS_CLAIM_PROCESSOR)) {
    ClaimsProcessorTemplate.create(address);
  } else if (isMatch(namespace, CNS_LIQUIDITY_ENGINE)) {
    LiquidityEngineTemplate.create(address);
  } else if (isMatch(namespace, CNS_COVER_REASSURANCE)) {
    CoverReassuranceTemplate.create(address);
  } else if (isMatch(namespace, CNS_COVER_STAKE)) {
    CoverStakeTemplate.create(address);
  } else if (isMatch(namespace, CNS_COVER_POLICY_ADMIN)) {
    PolicyAdminTemplate.create(address);
  } else if (isMatch(namespace, CNS_COVER_VAULT)) {
    VaultTemplate.create(address);
  }
  // else if (isMatch(namespace, '')) {
  //   StoreTemplate.create(address);
  // }
}

export function handleContractAdded(event: ContractAdded): void {
  const id = createEventID(event);

  let entity = ContractAddedEvent.load(id);

  if (!entity) {
    entity = new ContractAddedEvent(id);
  }

  entity.namespace = event.params.namespace.toHexString();
  entity.key = event.params.key.toHexString();
  entity.contractAddress = event.params.contractAddress.toHexString();

  createTemplate(event.params.namespace, event.params.contractAddress);

  const tx = loadTransaction(event);
  entity.transaction = tx.id;
  entity.createdAtTimestamp = tx.timestamp;

  entity.save();
}

export function handleContractUpgraded(event: ContractUpgraded): void {
  const id = createEventID(event);

  let entity = ContractUpgradedEvent.load(id);

  if (!entity) {
    entity = new ContractUpgradedEvent(id);
  }

  entity.namespace = event.params.namespace.toHexString();
  entity.key = event.params.key.toHexString();
  entity.previous = event.params.previous.toHexString();
  entity.current = event.params.current.toHexString();

  createTemplate(event.params.namespace, event.params.current);

  const tx = loadTransaction(event);
  entity.transaction = tx.id;
  entity.createdAtTimestamp = tx.timestamp;

  entity.save();
}

export function handleInitialized(event: Initialized): void {
  const id = createEventID(event);
  let entity = InitializedEvent.load(id);

  if (!entity) {
    entity = new InitializedEvent(id);
  }

  entity.burner = event.params.args.burner.toHexString();
  entity.uniswapV2RouterLike = event.params.args.uniswapV2RouterLike.toHexString();
  entity.uniswapV2FactoryLike = event.params.args.uniswapV2FactoryLike.toHexString();
  entity.npm = event.params.args.npm.toHexString();
  entity.treasury = event.params.args.treasury.toHexString();
  entity.priceOracle = event.params.args.priceOracle.toHexString();
  entity.coverCreationFee = event.params.args.coverCreationFee;
  entity.minCoverCreationStake = event.params.args.minCoverCreationStake;
  entity.minStakeToAddLiquidity = event.params.args.minStakeToAddLiquidity;
  entity.firstReportingStake = event.params.args.firstReportingStake;
  entity.claimPeriod = event.params.args.claimPeriod;
  entity.reportingBurnRate = event.params.args.reportingBurnRate;
  entity.governanceReporterCommission =
    event.params.args.governanceReporterCommission;
  entity.claimPlatformFee = event.params.args.claimPlatformFee;
  entity.claimReporterCommission = event.params.args.claimReporterCommission;
  entity.flashLoanFee = event.params.args.flashLoanFee;
  entity.flashLoanFeeProtocol = event.params.args.flashLoanFeeProtocol;
  entity.resolutionCoolDownPeriod = event.params.args.resolutionCoolDownPeriod;
  entity.stateUpdateInterval = event.params.args.stateUpdateInterval;
  entity.maxLendingRatio = event.params.args.maxLendingRatio;
  entity.lendingPeriod = event.params.args.lendingPeriod;
  entity.withdrawalWindow = event.params.args.withdrawalWindow;
  entity.policyFloor = event.params.args.policyFloor;
  entity.policyCeiling = event.params.args.policyCeiling;

  const tx = loadTransaction(event);
  entity.transaction = tx.id;
  entity.createdAtTimestamp = tx.timestamp;

  entity.save();
}

export function handleMemberAdded(event: MemberAdded): void {
  const id = createEventID(event);
  let entity = MemberAddedEvent.load(id);

  if (!entity) {
    entity = new MemberAddedEvent(id);
  }

  entity.member = event.params.member.toHexString();

  const tx = loadTransaction(event);
  entity.transaction = tx.id;
  entity.createdAtTimestamp = tx.timestamp;

  entity.save();
}

export function handleMemberRemoved(event: MemberRemoved): void {
  const id = createEventID(event);
  let entity = MemberRemovedEvent.load(id);

  if (!entity) {
    entity = new MemberRemovedEvent(id);
  }

  entity.member = event.params.member.toHexString();

  const tx = loadTransaction(event);
  entity.transaction = tx.id;
  entity.createdAtTimestamp = tx.timestamp;

  entity.save();
}

export function handleRoleAdminChanged(event: RoleAdminChanged): void {
  const id = createEventID(event);
  let entity = RoleAdminChangedEvent.load(id);

  if (!entity) {
    entity = new RoleAdminChangedEvent(id);
  }

  entity.role = event.params.role.toHexString();
  entity.previousAdminRole = event.params.previousAdminRole.toHexString();
  entity.newAdminRole = event.params.newAdminRole.toHexString();

  const tx = loadTransaction(event);
  entity.transaction = tx.id;
  entity.createdAtTimestamp = tx.timestamp;

  entity.save();
}

export function handleRoleGranted(event: RoleGranted): void {
  const id = createEventID(event);
  let entity = RoleGrantedEvent.load(id);

  if (!entity) {
    entity = new RoleGrantedEvent(id);
  }

  entity.role = event.params.role.toHexString();
  entity.account = event.params.account.toHexString();
  entity.sender = event.params.sender.toHexString();

  const tx = loadTransaction(event);
  entity.transaction = tx.id;
  entity.createdAtTimestamp = tx.timestamp;

  entity.save();
}

export function handleRoleRevoked(event: RoleRevoked): void {
  const id = createEventID(event);
  let entity = RoleRevokedEvent.load(id);

  if (!entity) {
    entity = new RoleRevokedEvent(id);
  }

  entity.role = event.params.role.toHexString();
  entity.account = event.params.account.toHexString();
  entity.sender = event.params.sender.toHexString();

  const tx = loadTransaction(event);
  entity.transaction = tx.id;
  entity.createdAtTimestamp = tx.timestamp;

  entity.save();
}
