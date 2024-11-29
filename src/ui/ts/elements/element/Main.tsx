import * as React from 'react'
import Menu from '../blocks/Menu/Menu.tsx'
import "../../../css/elems/menu.css"
import ModalController from '../../../../domain/app/modal/modal_controller.tsx'
import ExitModal from '../blocks/modal/ExitModal.tsx'

export default function Main({ children }): React.JSX.Element {

    const [modalTr, setModalTr] = React.useState<boolean>(false)

    const modalSwitcher = () => {
        setModalTr(!modalTr)
    }

    return <main className="flex items-center justify-center w-full" style={{ height: "100vh" }}>
        <ModalController
            modal={<ExitModal
                trigger={modalSwitcher}
            />}
            trigger={modalTr}
        />
        <section className="rounded-2xl bg-gray-900/70 backdrop-blur-md max-w-full h-full content__parent" style={{ width: 800 }}>
            <Menu
                setTrigger={modalSwitcher}
            />
            <section className="w-full h-full rounded-r-2xl p-5">
                {children}
            </section>
        </section>
    </main>
}