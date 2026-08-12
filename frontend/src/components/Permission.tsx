import { useAuth } from "../context/AuthContext";


export function Can({
  permission,
  children
}:{
  permission:string;
  children:React.ReactNode
}){

 const {user}=useAuth();

 if(!user) return null;


 const allowed =
   permissions[permission]
   ?.includes(user.role);


 if(!allowed) return null;


 return children;
}