import { useForm } from "react-hook-form";
import "../css/setting.css";
import { useAuth, useToken } from "../service/auth";
import { ProfileType } from "../utils/Types";
import { useEffect, useState } from "react";
import { ProfileApi } from "../config/AxiosUtils";
import Spiner from "./Spiner";
import { castProfileUpdateValue } from "../utils/CastintoFormData";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginSignup } from "../features/authSlice";
import DefaultProfileImg from "../assets/development/defaultProfileImage.jpg";
const Setting = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [profilPrev, setprofilPrev] = useState(null);
  const dispatch = useDispatch();
  const { user } = useAuth();
  const token = useToken();
  const { register, handleSubmit, watch } = useForm<ProfileType>({
    defaultValues: {
      email: user?.email,
      userName: user?.userName,
      userPhone: user?.phoneNumber,
    },
  });

  useEffect(() => {
    const setPrfilePrev: any = watch("profilePic");

    if (setPrfilePrev?.length) {
      // console.log(setPrfilePrev);
      const reader = new FileReader();
      reader.onload = (e: any) => {
        // console.log(e?.target?.result);

        setprofilPrev(e?.target?.result);
      };
      reader.readAsDataURL(setPrfilePrev[0]);
    }
  });

  // console.log(profilPrev, "This is image url");

  const profileUpdate = (formData: ProfileType) => {
    console.log(formData);

    const data = castProfileUpdateValue(formData, user?.id);
    // return;
    setLoading(true);
    ProfileApi.updateProfile(data, token)
      .then((res) => {
        // console.log(res);
        dispatch(
          loginSignup({
            user: res?.data?.data,
            token: token,
          })
        );
        toast.success(res?.data?.message);
      })
      .catch((e) => {
        // console.log(e);
        if (e?.message === "Network Error") {
          return toast.error(e?.message);
        }
        toast.error(e?.response?.data?.message);
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
    console.log(formData);
  };

  return (
    <>
      <Spiner loading={loading} />
      <div className="profile_details_container">
        <div className="border_bootm">
          <h5 className="quicksand-600-18">Profile Details</h5>
        </div>
        <form
          aria-autocomplete="both"
          onSubmit={handleSubmit(profileUpdate)}
          style={{ padding: "0px 6px" }}
        >
          <div className="profile_details">
            <div className="name_group">
              <div className="form_group">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" {...register("userName")} />
              </div>
              <div className="form_group">
                <label htmlFor="email">Email Address:</label>
                <input
                  type="email"
                  id="email"
                  {...register("email", {
                    required: "true",
                  })}
                  readOnly
                />
              </div>
              <div className="form_group">
                <label htmlFor="userPhone">Phone No:</label>
                <input type="text" id="userPhone" {...register("userPhone")} />
              </div>
            </div>
            <div className="profilePicdv">
              <input
                type="file"
                id="profilePic"
                className="hidden-input"
                {...register("profilePic")}
                multiple={false}
              />
              <label
                htmlFor="profilePic"
                className="edit_icon"
                style={{ cursor: "pointer" }}
              >
                <div style={{ position: "relative", width: "fit-content" }}>
                  <img
                    src={
                      profilPrev
                        ? profilPrev
                        : user?.userProfilePic?.imgUrl
                        ? user?.userProfilePic?.imgUrl
                        : DefaultProfileImg
                    }
                    alt="profile"
                    className="profilepic"
                    style={{ width: "200px" }}
                  />
                  <span className="profile_picker">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 14 14"
                      fill="none"
                    >
                      <path
                        d="M9.65 4.4625L7.525 2.3625L8.225 1.6625C8.41667 1.47083 8.65217 1.375 8.9315 1.375C9.21083 1.375 9.44617 1.47083 9.6375 1.6625L10.3375 2.3625C10.5292 2.55417 10.6292 2.7855 10.6375 3.0565C10.6458 3.3275 10.5542 3.55867 10.3625 3.75L9.65 4.4625ZM8.925 5.2L3.625 10.5H1.5V8.375L6.8 3.075L8.925 5.2Z"
                        fill="white"
                      ></path>
                    </svg>
                  </span>
                </div>
              </label>
            </div>
          </div>
          <div className="profile_password">
            <div className="border_bootm">
              <h5>Change Password</h5>
            </div>
            <div className="form_group">
              <label htmlFor="oldPassword">Enter Old Password:</label>
              <input
                type="password"
                id="oldPassword"
                {...register("oldPassword")}
              />
            </div>
            <div className="form_group">
              <label htmlFor="newPassword">Enter New Password:</label>
              <input
                type="password"
                id="newPassword"
                {...register("newPassword")}
              />
            </div>
          </div>
          <button className="saveButton quicksand-500-18 parrot_background">
            Save Updates
          </button>
        </form>
      </div>
    </>
  );
};

export default Setting;
