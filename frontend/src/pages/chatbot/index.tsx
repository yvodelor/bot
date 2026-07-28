import  AppLayout from "../layouts/AppLayout"

import { useAuth } from "../context/authContext.tsx";


export default function Bots(){
    const { userId, email, name, role } = useAuth();
    return(
        <AppLayout>
            <div>
                <div className="bg-green-500 text-white p-6">
                    Home Page
                </div>
            </div>
            <div>
                <p>{userId}</p>
                <p>{email}</p>
                <p>{name}</p>
                <p>{role}</p>
            </div>
        </AppLayout>
    )
}