import Head from "next/head"
import { useEffect, useRef, useState } from "react"
import NavMenu from "../components/NavMenu"
import PersonDetail from "../components/PersonDetail"
import Image from "next/image"


const Detail = () => {
    const [id, setId] = useState<number>()
    const searchId = useRef<HTMLInputElement>(null)
    const [photo,setPhoto]=useState<string>('')
    const [info,setInfo]=useState<string>('')
    const search = () => {
        if (searchId.current?.value) {setId(Number(searchId.current.value))
        sessionStorage.setItem('id',searchId.current.value)
        }
    }
    useEffect(() => {
        if (sessionStorage.getItem('id')) { setId(Number(sessionStorage.getItem('id'))) }
    }, [])

    

    return (
        <>
            <Head>
                <title>Herytage</title>
                <meta name="description" content="heritage of Petr Herynek" />
            </Head>
            <NavMenu />
            <div className="mainContent">
            {photo && (<Image src={photo} alt={"profile image"} width={100} height={100} className='col-start-1 col-end-2 row-start-2 row-end-15'/>)}
            <div className="col-start-2 col-end-3 row-start-1 row-end-11 ">
            {id && (<PersonDetail id={id} setPhoto={(x:string)=>setPhoto(x)} setInfo={(x:string)=>setInfo(x)} />)}
            </div>
            {info && (
            <div className="col-start-2 col-end-3 row-start-11 row-end-21">
                <h2>Info</h2>
                <div>{info}</div>
            </div>
                )}
            <div className="col-start-3 col-end-4 row-start-1 row-end-4">
            <div className="w-28 m-1">Search by ID :</div>
            <input ref={searchId} className="w-28 border border-black rounded-md m-1 px-1" type="number" />
            <br />
            <button onClick={search} className="rounded-xl border border-black bg-blue-300 w-16 m-1">Search</button>
            </div>
            </div>
        </>
    )
}

export default Detail