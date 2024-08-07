import { Project, teamMember } from "../types";

export const isManager = (
  managerId: Project["_id"],
  userId: teamMember["_id"]
) => {
  return managerId === userId;
};
