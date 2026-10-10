import config from "../config";
import { STATUS, USER_ROLE } from "../modules/user/user.constant";
import { User } from "../modules/user/user.model";

const superAdminData = {
  id: "0001",
  email: config.super_admin_email as string,
  password: config.super_admin_password as string,
  needsPasswordChange: false,
  role: USER_ROLE.super_admin,
  status: STATUS["in-progress"],
  isDeleted: false,
} as const;

export const seedSuperAdmin = async () => {
  try {
    const isSuperAdminExists = await User.findOne({
      id: superAdminData.id,
      role: USER_ROLE.super_admin,
    });

    if (!isSuperAdminExists) {
      await User.create(superAdminData);
    }
  } catch (error) {
    return error;
  }
};
