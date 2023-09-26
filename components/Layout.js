import Nav from "./Nav";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Layout({children}) {
  const { data: session } = useSession();

  if(!session){
    return(<div className='bg-blue-900 flex items-center w-screen h-screen'>
    <div className=' text-center w-full'>
      <button className='bg-slate-50 p-2 px-2 rounded-lg' onClick={()=>signIn('google')}>Sign in with Google</button>
    </div>
  </div>);
  }

  else{
    return (
      <div className="bg-blue-900 min-h-screen flex">
        <Nav/>
        <div className="bg-white flex-grow mt-1 mr-2 mb-2 rounded-lg p-4">{children}</div>
      </div>
    )
  }

}
