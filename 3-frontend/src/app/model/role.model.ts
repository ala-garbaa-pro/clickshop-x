export interface Role {
  name: string;
  _links: {
    self: { href: string };
    user: { href: string };
    roles: { href: string };
  };
}