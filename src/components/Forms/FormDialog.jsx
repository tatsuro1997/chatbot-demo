import React, { useState, useCallback, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextInput from './TextInput';

const FormDialog = (props) => {
    const [description, setDescription] = useState("")
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")

    const inputDescription = useCallback((event) => {
        setDescription(event.target.value)
    }, [setDescription])

    const inputEmail = useCallback((event) => {
        setEmail(event.target.value)
    },[setEmail])

    const inputName = useCallback((event) => {
        setName(event.target.value)
    },[setName])

    const validateEmailFormat = (email) => {
        const regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        return regex.test(email)
    }

    const validateRequiredInput = (...args) => {
        let isBlank = false;
        for (let i = 0; i < args.length; i = (i + 1) | 0) {
            if (args[i] === "") {
                isBlank = true;
            }
        }
        return isBlank
    }

    // Slackに問い合わせがあったことを通知する
    const submitForm = () => {
        const isBlank = validateRequiredInput(name, email, description)
        const isValidEmail = validateEmailFormat(email)
        const url = process.env.REACT_APP_WEBHOOK_URL

        if (isBlank) {
            alert('必須入力欄が空白です。')
            return false
        } else if (!isValidEmail) {
            alert('メールアドレスの書式が異なります。')
            return false
        } else {
            const payload = {
                text: 'お問い合わせがありました\n'
                    + 'お名前: ' + name + '\n'
                    + 'メールアドレス: ' + email + '\n'
                    + '【問い合わせ内容】\n' + description
            }

            // fetchメソッドでフォームの内容をスラックのIncoming Webhook URLに送信する
            fetch(url, {
                method: 'POST',
                body: JSON.stringify(payload)
            }).then(() => {
                alert('送信が完了しました。追ってご連絡します！')
                setDescription("")
                setEmail("")
                setName("")
                return props.handleClose()
            })
        }
    }

    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                お問い合わせフォーム
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                        <TextInput
                            label={"お名前（必須）"} multiline={false} rows={1}
                            value={name} type={"txst"} onChange={inputName}
                        />
                        <TextInput
                            label={"メールアドレス（必須）"} multiline={false} rows={1}
                            value={email} type={"email"} onChange={inputEmail}
                        />
                        <TextInput
                            label={"お問い合わせ内容（必須）"} multiline={true} rows={5}
                            value={description} type={"text"} onChange={inputDescription}
                        />
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose}>キャンセル</Button>
                <Button onClick={submitForm} autoFocus>
                    送信する
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default FormDialog
