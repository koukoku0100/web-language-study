export type AdminNavItem = {
  screenId: string;
  label: string;
};

export type CurrentAdmin = {
  name: string;
  roleLabel: string;
  email: string;
};

export type AdminShellState = {
  productName: string;
  productDescription: string;
  navItems: AdminNavItem[];
  currentAdmin: CurrentAdmin;
};
