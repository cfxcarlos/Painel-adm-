import { Navigation } from "./_components/Navigation";
import ServerLogo from "/Logo.png";
import { emit } from "../../hooks/emit";
import { useEffect, useState } from "react";
import { useUser } from "../../stores/useUser";

export const Aside = () => {
  interface UserProfileProps {
    Image: string,
    name: string,
    charge: string
  }

  const [showModal, setShowModal] = useState<boolean>(false)
  const [userImage, setUserImage] = useState<string>('')
  const [userProfile, setUserProfile] = useState<UserProfileProps>({
    Image: '',
    name: '',
    charge: ''
  })

  const OpenModal = () => {
    setShowModal(true)
  }
  const ExitModal = () => {
    setShowModal(false)
  }

  const handleSave = () => {
    emit('setUserImage', { userImage })
    .then((resp: any) => {
      setUserProfile(resp)
    })
    .catch((err) => {
      console.error(err)
    })
    ExitModal()
  }

  useEffect(() => {
    emit('getUserData', { userProfile })
      .then((resp: any) => {
        setUserProfile(resp)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  return (
    <aside className="w-[278px] h-full flex flex-col items-center pt-[15px] gap-[37px] flex-none">
      {/* <img
        src={ServerLogo}
        className="max-h-[41px]"
        alt="Server Logo"
        draggable={false}
      /> */}
      {userProfile && (
        <div className="flex flex-col items-center gap-[25px] h-full">
          <div className="flex-none flex flex-col items-center gap-[20px]">
            <button onClick={OpenModal}>
              <div className="size-[106px] rounded-full p-[5px] border-[2px] border-solid border-white/15">
                <img
                  className="w-full h-full rounded-full"
                  src={userProfile.Image}
                  draggable={false}
                />
              </div>
            </button>
            <div className="flex flex-col items-center gap-[8px]">
              <h1 className="text-white text-[25px] font-extrabold leading-none">
                {userProfile.name}
              </h1>
              <h2 className="text-white text-[15px] font-medium">
                {userProfile.charge}
              </h2>
            </div>
          </div>
          <Navigation />
        </div>
      )}
      {showModal && (
        <div className="absolute z-50 flex flex-col w-[542px] -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
          <div className="w-full bg-zinc-900 p-[30px] border-1 border-white/10 rounded-[10px] flex flex-col gap-[25px]">
            <div>
              <h1 className="text-white uppercase text-[1vw] font-extrabold">
                perfil
              </h1>
              <p className="text-white/50 text-[.8vw]">Insira uma foto de perfil</p>
            </div>
            <div className="flex gap-[15px]">
              <input
                onChange={(e) => setUserImage(e.target.value)}
                className="text-[15px] font-medium text-white placeholder:text-white/10 w-full h-[60px] pl-[18px] rounded-[5px] bg-transparent bg-gradient-to-r from-white/2 to-white/0 border-1 border-white/10"
                type="text"
                placeholder="https://media.discordapp.net/attachments/1178578062649086062/1280190209836978257/Logotipo_V1_Black_3000x3000-byfront.png?ex=66d72d8a&is=66d5dc0a&hm=048b6a24bee59f67f2d1323f850d5613566c3dc16c0c233909bce79e989955eb&=&format=webp&quality=lossless&width=468&height=468"
              />
            </div>
            <div className="flex gap-[15px] h-[48px]">
              <button
                onClick={ExitModal}
                className="w-[202px] h-full bg-white/2 hover:bg-white/5 rounded-[5px] border-1 border-white/10 hover:border-white/25 text-white/10 text-[15px] font-extrabold uppercase hover:text-white tracking-[0.75px]"
              >
                voltar
              </button>
              <button
                onClick={handleSave}
                className="w-[265px] h-full bg-white/2 hover:bg-white/5 rounded-[5px] border-1 border-white/10 hover:border-white/25 text-white/10 text-[15px] font-extrabold uppercase hover:text-white tracking-[0.75px]"
              >
                confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};