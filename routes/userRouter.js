const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const userController = require('../controllers/userController');

// tüm kullanıcıların bilgilerini sadece admin listeleyebilir
router.get('/', [authMiddleware, adminMiddleware], userController.listAllUsers);

// oturum açan kullanıcının kendi user bilgilerini listeler.
router.get('/me', authMiddleware, userController.showMyInformations);

// oturum açan kullanıcının kendi user bilgilerini günceller.
router.patch('/me', authMiddleware, userController.updateMyInformations);

// admin diğer tüm kullanıcıların bilgilerini siler, adminler hariç.
router.get('/deleteAll', [authMiddleware, adminMiddleware], userController.deleteAllUsers);

// oturum açan user kendi bilgilerini siler.
router.delete('/me', authMiddleware, userController.deleteMyInformations);

// id'ye göre listeler.
router.get('/:id', userController.listById);

// yeni kullanıcı oluşturup db'ye kaydeder.
router.post('/', userController.createNewUser);

// verilen token ile kullanıcı giriş yapar.
router.post('/login', userController.loginByToken);

// id ile update işlemi yapar.
router.patch('/:id', userController.updateById);

// id ile delete işlemini yapar.
router.delete('/:id', userController.deleteById);

module.exports = router;
