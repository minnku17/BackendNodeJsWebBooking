import doctorService from "../services/doctorService";
import db from "../models/index";

let getTopDoctorHome = async (req, res) => {
  let limit = req.query.limit;
  if (!limit) limit = 10;
  try {
    let resDoctors = await doctorService.getTopDoctorHome(+limit);

    return res.status(200).json({
      errCode: resDoctors.errCode,
      data: resDoctors.data,
    });
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server...",
    });
  }
};
let getAllDoctors = async (req, res) => {
  try {
    let doctors = await doctorService.getAllDoctors();
    return res.status(200).json({
      errCode: doctors.errCode,
      data: doctors.data,
    });
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server...",
    });
  }
};
let postInfoDoctor = async (req, res) => {
  try {
    let response = await doctorService.saveDetailInfoDoctor(req.body);
    return res.status(200).json({
      errCode: response.errCode,
      errMessage: response.errMessage,
    });
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server...",
    });
  }
};
module.exports = {
  getTopDoctorHome: getTopDoctorHome,
  getAllDoctors: getAllDoctors,
  postInfoDoctor: postInfoDoctor,
};
