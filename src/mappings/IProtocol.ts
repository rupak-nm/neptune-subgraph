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
  const id = event.transaction.hash
    .toHexString()
    .concat("-")
    .concat(event.params.namespace.toString())
    .concat("-")
    .concat(event.params.contractAddress.toHexString());

  let entity = ContractAddedEvent.load(id);

  if (!entity) {
    entity = new ContractAddedEvent(id);
  }

  entity.namespace = event.params.namespace.toString();
  entity.key = event.params.key.toString();
  entity.contractAddress = event.params.contractAddress;

  createTemplate(event.params.namespace, event.params.contractAddress);

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}

export function handleContractUpgraded(event: ContractUpgraded): void {
  const id = event.transaction.hash
    .toHexString()
    .concat("-")
    .concat(event.params.namespace.toString())
    .concat("-")
    .concat(event.params.current.toHexString());

  let entity = ContractUpgradedEvent.load(id);

  if (!entity) {
    entity = new ContractUpgradedEvent(id);
  }

  entity.namespace = event.params.namespace.toString();
  entity.key = event.params.key.toString();
  entity.previous = event.params.previous;
  entity.current = event.params.current;

  createTemplate(event.params.namespace, event.params.current);

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}

export function handleInitialized(event: Initialized): void {
  const id = createEventID(event);
  let entity = InitializedEvent.load(id);

  if (!entity) {
    entity = new InitializedEvent(id);
  }

  entity.burner = event.params.args.burner;
  entity.uniswapV2RouterLike = event.params.args.uniswapV2RouterLike;
  entity.uniswapV2FactoryLike = event.params.args.uniswapV2FactoryLike;
  entity.npm = event.params.args.npm;
  entity.treasury = event.params.args.treasury;
  entity.priceOracle = event.params.args.priceOracle;
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
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}

export function handleMemberAdded(event: MemberAdded): void {
  const id = createEventID(event);
  let entity = MemberAddedEvent.load(id);

  if (!entity) {
    entity = new MemberAddedEvent(id);
  }

  entity.member = event.params.member;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}

export function handleMemberRemoved(event: MemberRemoved): void {
  const id = createEventID(event);
  let entity = MemberRemovedEvent.load(id);

  if (!entity) {
    entity = new MemberRemovedEvent(id);
  }

  entity.member = event.params.member;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}

export function handleRoleAdminChanged(event: RoleAdminChanged): void {
  const id = createEventID(event);
  let entity = RoleAdminChangedEvent.load(id);

  if (!entity) {
    entity = new RoleAdminChangedEvent(id);
  }

  entity.role = event.params.role;
  entity.previousAdminRole = event.params.previousAdminRole;
  entity.newAdminRole = event.params.newAdminRole;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}

export function handleRoleGranted(event: RoleGranted): void {
  const id = createEventID(event);
  let entity = RoleGrantedEvent.load(id);

  if (!entity) {
    entity = new RoleGrantedEvent(id);
  }

  entity.role = event.params.role;
  entity.account = event.params.account;
  entity.sender = event.params.sender;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}

export function handleRoleRevoked(event: RoleRevoked): void {
  const id = createEventID(event);
  let entity = RoleRevokedEvent.load(id);

  if (!entity) {
    entity = new RoleRevokedEvent(id);
  }

  entity.role = event.params.role;
  entity.account = event.params.account;
  entity.sender = event.params.sender;

  const tx = loadTransaction(event);
  entity.createdAtTimestamp = tx.timestamp;
  entity.transaction = tx.id;

  entity.save();
}
