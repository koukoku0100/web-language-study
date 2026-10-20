export type PermissionValue = "allowed" | "denied";

export type AccountStatus = "active" | "suspended";

export type RoleColumn = {
  id: string;
  name: string;
};

export type PermissionCell = {
  roleId: string;
  value: PermissionValue;
};

export type PermissionRow = {
  id: string;
  actionLabel: string;
  cells: PermissionCell[];
};

export type AdminAccount = {
  id: string;
  name: string;
  email: string;
  roleName: string;
  status: AccountStatus;
};

export type AdminRoleState = {
  screenId: "WELG0150";
  showSampleDataBadge: boolean;
  title: string;
  description: string;
  permissionHeading: string;
  permissionNote: string;
  roleColumns: RoleColumn[];
  permissionRows: PermissionRow[];
  accountHeading: string;
  accounts: AdminAccount[];
};
