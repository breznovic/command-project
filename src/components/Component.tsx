import React, {ChangeEvent, useState} from 'react'
import Input from "./Input"
import Button from "./Button"
import Checkbox from "./Checkbox"
import s from './Component.module.css'

function Component() {
    const [text, setText] = useState<string>('')
    const error = text ? '' : 'error'

    const showAlert = () => {
        if (error) {
            alert('Type text...')
        } else {
            alert(text)
        }
    }

    const [checked, setChecked] = useState<boolean>(false)
    const testOnChange = (e: ChangeEvent<HTMLInputElement>) => setChecked(e.currentTarget.checked)

    return (
        <div>
            <div className={s.column}>Component</div>
            <div className={s.column}>
                <Input
                    value={text}
                    onChangeText={setText}
                    onEnter={showAlert}
                    error={error}
                    spanClassName={s.testSpanError}
                />

                <Input className={s.blue}/>
                <Button>
                    default
                </Button>
                <Button
                    red
                    onClick={showAlert}>
                    delete
                </Button>
                <Button disabled>
                    disabled
                </Button>
                <Checkbox checked={checked} onChange={testOnChange}/>
            </div>
        </div>
    )
}

export default Component