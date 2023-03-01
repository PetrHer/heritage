/* eslint-disable @typescript-eslint/no-misused-promises */
import Head from "next/head"
import { useEffect, useRef, useState } from "react"
import NavMenu from "../components/NavMenu"
import PersonDetail from "../components/PersonDetail"
import Image from "next/image"
import { api } from "../utils/api"
import { uploadImage } from "../utils/uploader"


const Detail = () => {
    const [id, setId] = useState<number>()
    const searchId = useRef<HTMLInputElement>(null)
    const [photo, setPhoto] = useState<string>('')
    const [info, setInfo] = useState<string>('')
    const filePath = useRef<HTMLInputElement>(null)
    const [disableCheck,setDisableCheck]=useState<boolean>(true)
    const search = () => {
        if (searchId.current?.value) {
            setId(Number(searchId.current.value))
            sessionStorage.setItem('id', searchId.current.value)
        }
    }
    useEffect(() => {
        if (sessionStorage.getItem('id')) { setId(Number(sessionStorage.getItem('id'))) }
    }, [])
    const uploader = api.dbRouter.uploadImage.useMutation()


    const uploadPic = async () => {
        if (filePath.current?.files && filePath.current.files[0] && id) {
            const file = filePath.current.files[0];
            const path = await uploadImage(file, file.name)
            if (path?.data.publicUrl) { uploader.mutate({ filePath: path.data.publicUrl, id: id }) }
        }
    }
    if (uploader.isSuccess) {window.location.reload()}
    const selectedPics = () => {
        if (filePath.current?.files){setDisableCheck(false)}
        else {setDisableCheck(true)}
    }

    return (
        <>
            <Head>
                <title>Herytage</title>
                <meta name="description" content="heritage of Petr Herynek" />
            </Head>
            <NavMenu />
            <div className="mainContent">
                {photo && (
                <div className="justify-items-center flex flex-col items-center">
                <Image src={photo} alt={"profile image"} width={400} height={400} className='w-1/2 m-1' />
                <input ref={filePath} onChange={selectedPics} type='file' className="m-1" />
                <button disabled={disableCheck ? true : false} onClick={uploadPic} className='buttons'>Change</button>
                </div>
                )}
                {!photo && (<>
                    <input ref={filePath} type='file' />
                    <button onClick={uploadPic} disabled={disableCheck ? true : false} className='buttons'>Upload</button>
                </>
                )}
                <div className="col-start-2 col-end-3 row-start-1 row-end-11 ">
                    {id && (<PersonDetail id={id} setPhoto={(x: string) => setPhoto(x)} setInfo={(x: string) => setInfo(x)} />)}
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
                    <button onClick={search} className="buttons">Search</button>
                </div>
            </div>
        </>
    )
}

export default Detail