// import { Input } from "./ui/input"

// const InputData = ({label, Icon, type, id, placeholder, register, rules, errors}) => {
//     return(
//     <div>
//       <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
//       <div className="relative">
//         <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
//         <Input
//           type={type}
//           id={id}
//           placeholder={placeholder}
//           className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-gray-200"
//           {...register(id, rules)}
//         />
//       </div>
//         {errors[id] && <p className="text-xs text-red-500 mt-1">{errors[id]?.message}</p>}
//     </div>
//     )
//   }

// export default InputData

// import { Input } from "./ui/input";

// const InputData = ({
//   label,
//   Icon,
//   type,
//   id,
//   placeholder,
//   register,
//   rules,
//   errors
// }) => {
//   const hasIcon = Boolean(Icon);

//   return (
//     <div>
//       <label className="block text-sm font-semibold text-gray-700 mb-2">
//         {label}
//       </label>

//       <div className="relative">
//         {hasIcon && (
//           <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
//         )}

//         <Input
//           type={type}
//           id={id}
//           placeholder={placeholder}
//           className={`w-full py-3.5 rounded-xl border-2 border-gray-200 ${
//             hasIcon ? "pl-12 pr-4" : "px-4"
//           }`}
//           {...register(id, rules)}
//         />
//       </div>

//       {errors[id] && (
//         <p className="text-xs text-red-500 mt-1">{errors[id]?.message}</p>
//       )}
//     </div>
//   );
// };

// export default InputData;



import { Input } from "./ui/input";

const InputData = ({ label, Icon, type, id, placeholder, register, rules, errors }) => {
  const hasIcon = Boolean(Icon);

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1"> {label} {rules ? <span className="text-red-500">*</span> : null} </label>

      <div className="relative">
        {hasIcon && (
          <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
        )}

        <Input
          type={type}
          id={id}
          placeholder={placeholder}
          className={`w-full py-3.5 rounded-xl border-2 border-gray-200 ${
            hasIcon ? "pl-12 pr-4" : "px-4"
          }`}
          {...register(id, rules)}
        />
      </div>

      {errors[id] && (
        <p className="text-xs text-red-500 mt-1">{errors[id]?.message}</p>
      )}
    </div>
  );
};

export default InputData;
