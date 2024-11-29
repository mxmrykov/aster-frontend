import * as React from 'react'

export default function ModalController({ modal, trigger }): React.JSX.Element {

    const [show, setShow] = React.useState<boolean>(false)

    React.useEffect(() => {
        setShow(trigger)
    }, [trigger])

    return <>
        {show ? modal : null}
    </>
}