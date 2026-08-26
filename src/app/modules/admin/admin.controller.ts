import { catchAsync } from "../../utils/catchAsync";
import { adminServices } from "./admin.service";

const getSingleAdmin = catchAsync(async (req, res) => {
  const { adminId } = req.params;
  const result = await adminServices.getSingleAdminFromDB(adminId as string);
  res.status(200).json({
    success: true,
    message: "Single faculty retrive successfully",
    data: result,
  });
});

const getAllAdmins = catchAsync(async (req, res) => {
  const result = await adminServices.getAllAdminsFromDB();
  res.status(200).json({
    success: true,
    message: "All admins retrived successfully",
    data: result,
  });
});

const updateAdmin = catchAsync(async (req, res) => {
  const { adminId } = req.params;
  const result = await adminServices.updateAdminIntoDB(
    adminId as string,
    req.body.admin,
  );
  res.status(200).json({
    success: true,
    message: "Updated admin successfully",
    data: result,
  });
});

const deleteAdmin = catchAsync(async (req, res) => {
  const { adminId } = req.params;
  const result = await adminServices.deleteAdminFromDB(adminId as string);
  res.status(200).json({
    success: true,
    message: "Deleted admin successfully",
    data: result,
  });
});

export const adminControllers = {
  getSingleAdmin,
  getAllAdmins,
  updateAdmin,
  deleteAdmin,
};
