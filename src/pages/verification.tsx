import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { api } from "../utils/api"


const Verification = () => {
const router = useRouter()
const passResToken = router.query.passwordToken as string || ''
const verifyEmail = api.authRouter.verifyEmail.useMutation()
useEffect(()=>{
   verifyEmail.mutate(passResToken)
// eslint-disable-next-line react-hooks/exhaustive-deps
},[passResToken])
if (verifyEmail.isSuccess){
  localStorage.setItem("token", verifyEmail.data);
  window.location.href='/'}
    return (<>
                <Head>
                <title>Herytage</title>
                <meta name="description" content="heritage of Petr Herynek" />
            </Head>
        <div>verification</div>
        {verifyEmail.isError && (<div>{verifyEmail.error.message}</div>)}
    </>
  )
}

export default Verification