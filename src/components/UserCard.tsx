import { USER_ROLE } from "@/constant/constant";
import moment from "moment";

const roleStyles = {
  [USER_ROLE.OWNER]: "bg-teal-100 text-teal-700",
  [USER_ROLE.ADMIN]: "bg-pink-100 text-pink-700",
  [USER_ROLE.CUSTOMER]: "bg-violet-100 text-violet-700",
};

const UserCard = ({ user }) => {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl border-2 border-gray-100 hover:bg-gray-50 transition-colors">
      <div>
        <p className="font-semibold text-gray-800 capitalize">
          {user.fullName}
        </p>
        <p className="text-sm text-gray-500">{user.email}</p>
      </div>

      <div className="text-right flex flex-col items-end">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            roleStyles[user.role] ?? "bg-gray-100 text-gray-600"
          }`}
        >
          {user.role}
        </span>
        <span className="text-xs text-gray-500 mt-1">
          {moment(user.createdAt).format("DD-MM-YY")}
        </span>
      </div>
    </div>
  );
};

export default UserCard;
