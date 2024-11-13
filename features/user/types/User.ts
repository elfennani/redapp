export default interface User {
  id: string;
  name: string;
  title?: string;
  icon?: string;
  banner?: string;
  description?: string;
  createdAt: number;
  karma: {
    total: number;
  };
}
