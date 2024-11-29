import * as React from 'react'
import Button from '../../element/Button.tsx'
import { CgSpinner } from 'react-icons/cg'
import exitSession from '../../../../../domain/https/auth/exit.ts'

export default function ExitModal({ trigger }): React.JSX.Element {

    const [pending, setPending] = React.useState<boolean>(false)

    return <section className="fixed bg-gray-900/70 backdrop-blur w-full h-full z-10 flex items-center justify-center">
        <article className="bg-gray-900/70 backdrop-blur-xs rounded-md p-4" style={{ width: 350, maxWidth: "95%" }}>
            <h1 className='text-2xl font-bold mb-4'>
                Выход
            </h1>
            <p className='mb-4'>
                Вы действительно хотите выйти? Для дальнейшего использования потребуется снова войти
            </p>
            <span className='flex justify-around'>
                {
                    !pending ? <Button
                        action={trigger}
                    >
                        Отмена
                    </Button> : null
                }
                <Button
                    action={() => {
                        setPending(true)
                        exitSession(
                            // @ts-ignore
                            localStorage.getItem("auth_at"),
                            localStorage.getItem("auth_signature")
                        ).then(r => {
                            if (r.status === 200) {
                                localStorage.removeItem("auth_at")
                                localStorage.removeItem("auth_signature")
                                window.location.href = "/a"
                            }
                        })
                    }}
                    type="d"
                >
                    {
                        pending ? <CgSpinner
                            className="animate-spin"
                            size={26}
                        /> : "Да"
                    }
                </Button>
            </span>
        </article>
    </section>
}