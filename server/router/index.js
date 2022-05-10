import { Router } from 'express'
import multer from 'multer'

import * as Api from './api/index.js'

const router = new Router()
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

router.post('/create-chat', Api.createChat)
router.post('/create-message', Api.createMessage)
router.delete('/delete-chat', Api.deleteChat)
router.delete('/delete-message', Api.deleteMessage)
router.delete('/delete-user', Api.deleteUser)
router.get('/get-chats', Api.getChats)
router.get('/get-messages', Api.getMessages)
router.get('/get-users', Api.getUsers)
router.put('/update-message', Api.updateMessage)
router.put('/update-user', Api.updateUser)
router.put('/read-messages', Api.readMessages)
router.put('/login', Api.login)
router.post('/sign-up', Api.signUp)
router.post('/upload-attachment', upload.any(), Api.uploadAttachment)

export default router